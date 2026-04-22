import { Context, ServerlessEventObject } from "@twilio-labs/serverless-runtime-types/types";
import BVNSPCheckinHandler, { HandlerEvent, BVNSPCheckinResponse, SMS_MAX_LENGTH, MESSAGE_PREFIX_TEMPLATE, MESSAGE_PREFIX_SUFFIX, NEXT_STEPS, validate_sms_message, format_phone_for_display, SmsValidationResult } from "../../src/handlers/bvnsp_checkin_handler";
import { CONFIG } from "../../src/env/handler_config";
import { CheckinValues } from "../../src/utils/checkin_values";
import { SectionValues } from "../../src/utils/section_values";
import { describe, beforeEach, afterEach, it, expect, test, jest } from '@jest/globals';

describe('BVNSPCheckinHandler', () => {
    let context: Context<any>;
    let event: ServerlessEventObject<HandlerEvent>;
    let handler: BVNSPCheckinHandler;

    beforeEach(() => {
        context = {
            getTwilioClient: jest.fn<any>().mockReturnValue({
                messages: {
                    create: jest.fn<any>()
                }
            })
        } as unknown as Context<any>;
        event = {
            From: "+1234567890",
            To: "+0987654321",
            Body: "checkin",
            request: {
                cookies: {
                    bvnsp_checkin_next_step: undefined
                }
            }
        } as ServerlessEventObject<HandlerEvent>;
        handler = new BVNSPCheckinHandler(context, event);
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    test('parse_fast_checkin_mode should return true for valid fast checkin', () => {
        expect(handler.parse_fast_checkin_mode("checkin-day")).toBe(true);
        expect(handler.checkin_mode).toBe("day");
    });

    test('parse_checkin should return true for valid checkin', () => {
        expect(handler.parse_checkin("day")).toBe(true);
    });

    test('parse_checkin should return true for valid checkin', () => {
        expect(handler.parse_checkin("am")).toBe(true);
    });

    test('parse_checkin should return true for valid checkin', () => {
        expect(handler.parse_checkin("pm")).toBe(true);
    });

    test('parse_checkin should return true for valid checkin', () => {
        expect(handler.parse_checkin("out")).toBe(true);
    });

    test('parse_checkin should return false for invalid checkin', () => {
        expect(handler.parse_checkin("Something else")).toBe(false);
    });

    test('parse_pass_from_next_step should return the correct pass type', () => {
        handler.bvnsp_checkin_next_step = "await-pass-comp-pass";
        expect(handler.parse_pass_from_next_step()).toBe("comp-pass");
    });

    test('delay should resolve after specified time', async () => {
        const start = Date.now();
        await handler.delay(1);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1);
    });

    test('send_message should add message to result_messages if not sms_request', async () => {
        handler.sms_request = false;
        await handler.send_message("Test message");
        expect(handler.result_messages).toContain("Test message");
    });

    test('prompt_command should return the correct response', () => {
        handler.patroller = { name: "Test Patroller" } as any;
        const response = handler.prompt_command();
        expect(response.response).toContain("Test Patroller");
        expect(response.next_step).toBe("await-command");
    });

    test('prompt_checkin should return the correct response', () => {
        handler.patroller = { name: "Test Patroller" } as any;
        const response = handler.prompt_checkin();
        expect(response.response).toContain("Test Patroller");
        expect(response.response).toContain("update patrolling status to");
        expect(response.next_step).toBe("await-checkin");
    });

    test('prompt_section_assignment should return the correct response', async () => {
        handler.patroller = { name: "Test Patroller", checkin: "checked-in" } as any;
        const response = await handler.prompt_section_assignment();
        expect(response.response).toContain("1,2,3,4");
        expect(response.next_step).toBe("await-section");
    });

    //  Tests for parse_fast_section_assignment
    test('parse_fast_section_assignment should return true and set assigned_section for valid input', () => {
        expect(handler.parse_fast_section_assignment("section-assignment-Training")).toBe(true);
        expect(handler.assigned_section).toBe("Training");
    });

    test('parse_fast_section_assignment should return  true and set assigned_section to "1" for "section-1"', () => {
        expect(handler.parse_fast_section_assignment("section-1")).toBe(true);
        expect(handler.assigned_section).toBe("1");
    });

    test('parse_fast_section_assignment should return  true and set assigned_section to "FAR" for "section-assignment-FAR"', () => {
        expect(handler.parse_fast_section_assignment("section-assignment-FaR")).toBe(true);
        expect(handler.assigned_section).toBe("FAR");
    });

    test('parse_fast_section_assignment should return  true and set assigned_section to "Training" for "sectionassignment-training"', () => {
        expect(handler.parse_fast_section_assignment("sectionassignment-Training")).toBe(true);
        expect(handler.assigned_section).toBe("Training");
    });

    test('parse_fast_section_assignment should return  true and set assigned_section to "Roving" for "assignment-roving"', () => {
        expect(handler.parse_fast_section_assignment("assignment-roving")).toBe(true);
        expect(handler.assigned_section).toBe("Roving");
    });

    test('parse_fast_section_assignment should return false for invalid input', () => {
        expect(handler.parse_fast_section_assignment("Section Assignment-FART")).toBe(false);
        expect(handler.assigned_section).toBeNull();
    });

    test('parse_fast_section_assignment should return false for invalid input', () => {
        expect(handler.parse_fast_section_assignment("invalid-input")).toBe(false);
        expect(handler.assigned_section).toBeNull();
    });

    // ---- MESSAGE command tests ----

    // format_phone_for_display tests

    test('format_phone_for_display should format a 10-digit number as (XXX)XXX-XXXX', () => {
        expect(format_phone_for_display("1234567890")).toBe("(123)456-7890");
    });

    test('format_phone_for_display should format all zeros correctly', () => {
        expect(format_phone_for_display("0000000000")).toBe("(000)000-0000");
    });

    // validate_sms_message tests

    test('validate_sms_message should accept a short plain-text message', () => {
        const result = validate_sms_message("All Patrollers report to Bear Top ASAP please");
        expect(result.valid).toBe(true);
    });

    test('validate_sms_message should accept a message with digits and punctuation', () => {
        const result = validate_sms_message("Chair Evacuation in progress! Refund $5.00 + tax for stuck guests.");
        expect(result.valid).toBe(true);
    });

    test('validate_sms_message should accept a message exactly 160 characters', () => {
        const result = validate_sms_message("x".repeat(160));
        expect(result.valid).toBe(true);
    });

    test('validate_sms_message should reject a message with emojis', () => {
        const result = validate_sms_message("Hello team! \uD83D\uDC4B");
        expect(result.valid).toBe(false);
        expect(result.reason).toBe("non_gsm7");
        expect(result.non_gsm_characters).toBeDefined();
        expect(result.non_gsm_characters!.length).toBeGreaterThan(0);
    });

    test('validate_sms_message should reject a message with smart/typographic quotes', () => {
        const result = validate_sms_message("He said \u201CHello\u201D");
        expect(result.valid).toBe(false);
        expect(result.reason).toBe("non_gsm7");
        expect(result.non_gsm_characters).toContain("\u201C");
        expect(result.non_gsm_characters).toContain("\u201D");
    });

    test('validate_sms_message should reject a message that exceeds one segment', () => {
        const result = validate_sms_message("a".repeat(161));
        expect(result.valid).toBe(false);
        expect(result.reason).toBe("too_many_segments");
        expect(result.segments_count).toBeGreaterThan(1);
    });

    test('validate_sms_message should return deduplicated non-GSM characters', () => {
        // Two occurrences of the same smart quote
        const result = validate_sms_message("\u201Chello\u201C");
        expect(result.valid).toBe(false);
        expect(result.non_gsm_characters).toEqual(["\u201C"]);
    });

    test('validate_sms_message should accept an empty string', () => {
        const result = validate_sms_message("");
        expect(result.valid).toBe(true);
    });

    // get_message_prefix tests

    test('get_message_prefix should return the correct prefix with sender name and phone', () => {
        const prefix = handler.get_message_prefix("John Doe", "1234567890");
        expect(prefix).toBe("Message from John Doe (123)456-7890: ");
    });

    test('get_message_prefix should include the template, name, formatted phone, and suffix', () => {
        const prefix = handler.get_message_prefix("Alice", "5551234567");
        expect(prefix).toBe(`${MESSAGE_PREFIX_TEMPLATE}Alice (555)123-4567${MESSAGE_PREFIX_SUFFIX}`);
    });

    // get_max_message_length tests

    test('get_max_message_length should return SMS_MAX_LENGTH minus prefix length', () => {
        const sender_name = "John Doe";
        const sender_phone = "1234567890";
        const expected_prefix = handler.get_message_prefix(sender_name, sender_phone);
        const expected_max = SMS_MAX_LENGTH - expected_prefix.length;
        expect(handler.get_max_message_length(sender_name, sender_phone)).toBe(expected_max);
    });

    test('get_max_message_length should return a smaller value for longer names', () => {
        const phone = "1234567890";
        const short_name_max = handler.get_max_message_length("Al", phone);
        const long_name_max = handler.get_max_message_length("Alexander Hamilton", phone);
        expect(short_name_max).toBeGreaterThan(long_name_max);
    });

    test('get_max_message_length should account for SMS_MAX_LENGTH of 160 including phone', () => {
        expect(SMS_MAX_LENGTH).toBe(160);
        const phone = "1234567890";
        // "Message from X (123)456-7890: " includes the phone
        const expected_prefix = "Message from X (123)456-7890: ";
        const max = handler.get_max_message_length("X", phone);
        expect(max).toBe(160 - expected_prefix.length);
    });

    // prompt_message tests

    test('prompt_message should allow a patroller who is not checked in to send a message', async () => {
        handler.patroller = { name: "Test Patroller", checkin: "" } as any;
        handler.from = "+15551111111";
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Bob Jones", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;

        const response = await handler.prompt_message();
        expect(response.response).toContain("1 patroller");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    test('prompt_message should return correct prompt for checked-in patroller', async () => {
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15559876543";
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Jane Smith", checkin: "All Day" },
                { name: "Bob Jones", checkin: "All Day" },
                { name: "Alice Walker", checkin: "Half AM" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;

        const response = await handler.prompt_message();
        const max_length = handler.get_max_message_length("Jane Smith", "5559876543");
        expect(response.response).toContain(`no more than ${max_length} plain-text characters`);
        // All 3 on-duty patrollers are recipients (including sender)
        expect(response.response).toContain("3 patrollers");
        expect(response.response).toContain("restart");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    test('prompt_message should allow sending when only sender is logged in', async () => {
        handler.patroller = { name: "Al", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Al", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;

        const response = await handler.prompt_message();
        expect(response.response).toContain("1 patroller,");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    // send_text_message tests

    test('send_text_message should reject messages containing non-GSM-7 characters', async () => {
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";

        const response = await handler.send_text_message("Hello \uD83D\uDC4B team!");
        expect(response.response).toContain("not supported in plain-text SMS");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    test('send_text_message should reject messages with smart quotes and show offending characters', async () => {
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";

        const response = await handler.send_text_message("He said \u201CHello\u201D");
        expect(response.response).toContain("not supported in plain-text SMS");
        expect(response.response).toContain("\u201C");
        expect(response.response).toContain("\u201D");
    });

    test('send_text_message should reject messages that exceed the character limit', async () => {
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        const max_length = handler.get_max_message_length("Jane Smith", "5551111111");
        const too_long = "x".repeat(max_length + 1);

        const response = await handler.send_text_message(too_long);
        expect(response.response).toContain("exceeds the limit");
        expect(response.response).toContain(`${max_length}`);
        expect(response.response).toContain("restart");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    test('send_text_message should accept a shorter retry after a too-long message', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";
        const max_length = handler.get_max_message_length("Jane Smith", "5551111111");

        // First attempt: too long — rejected
        const too_long = "x".repeat(max_length + 1);
        const first_response = await handler.send_text_message(too_long);
        expect(first_response.response).toContain("exceeds the limit");
        expect(first_response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);

        // Second attempt: short enough — accepted and sent
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Bob", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Bob": "+15552222222",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const shorter_message = "y".repeat(max_length);
        const second_response = await handler.send_text_message(shorter_message);
        expect(second_response.response).toContain("Message sent to 1 patroller");
        expect(second_response.next_step).toBeUndefined();
        expect(mockCreate).toHaveBeenCalledTimes(2); // 1 for Bob + 1 for sender (Jane)
    });

    test('send_text_message should reject again if retry message is still too long', async () => {
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        const max_length = handler.get_max_message_length("Jane Smith", "5551111111");

        // First attempt: too long
        const first_response = await handler.send_text_message("x".repeat(max_length + 5));
        expect(first_response.response).toContain("exceeds the limit");
        expect(first_response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);

        // Second attempt: still too long
        const second_response = await handler.send_text_message("x".repeat(max_length + 1));
        expect(second_response.response).toContain("exceeds the limit");
        expect(second_response.response).toContain(`${max_length}`);
        expect(second_response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    test('typing restart after a too-long message should cancel the message flow', async () => {
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        const max_length = handler.get_max_message_length("Jane Smith", "5551111111");

        // First: message too long — next_step remains AWAIT_MESSAGE
        const too_long = "x".repeat(max_length + 1);
        const first_response = await handler.send_text_message(too_long);
        expect(first_response.response).toContain("exceeds the limit");
        expect(first_response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);

        // Simulate 'restart' by calling _handle with body="restart" and the AWAIT_MESSAGE next_step.
        // The restart check happens at the top of _handle, before AWAIT_MESSAGE dispatch.
        handler.body = "restart";
        handler.body_raw = "restart";
        handler.bvnsp_checkin_next_step = NEXT_STEPS.AWAIT_MESSAGE;
        const restart_response = await handler._handle();
        expect(restart_response.response).toContain("start over");
        expect(restart_response.next_step).toBeUndefined();
    });

    test('send_text_message should send messages to all patrollers including sender', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15559876543";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Jane Smith", checkin: "All Day" },
                { name: "Bob Jones", checkin: "All Day" },
                { name: "Alice Walker", checkin: "Half AM" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane Smith": "+15559876543",
            "Bob Jones": "+15552222222",
            "Alice Walker": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Hello team!");
        expect(response.response).toContain("Message sent to 3 patrollers");
        // All 3 patrollers receive the message, including the sender
        expect(mockCreate).toHaveBeenCalledTimes(3);
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            to: "+15559876543",
            body: "Message from Jane Smith (555)987-6543: Hello team!",
        }));
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            to: "+15552222222",
            body: "Message from Jane Smith (555)987-6543: Hello team!",
        }));
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            to: "+15553333333",
            body: "Message from Jane Smith (555)987-6543: Hello team!",
        }));
    });

    test('send_text_message should report failures for patrollers without phone numbers', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Jane Smith", checkin: "All Day" },
                { name: "Bob Jones", checkin: "All Day" },
                { name: "Unknown Person", checkin: "Half AM" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane Smith": "+15551111111",
            "Bob Jones": "+15552222222",
            // "Unknown Person" is missing
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Alert!");
        expect(response.response).toContain("Message sent to 2 patrollers");
        expect(response.response).toContain("Could not send to: Unknown Person");
    });

    test('send_text_message should handle twilio send failures gracefully', async () => {
        const mockCreate = jest.fn<any>()
            .mockResolvedValueOnce({}) // Jane succeeds
            .mockResolvedValueOnce({}) // Bob succeeds
            .mockRejectedValueOnce(new Error("Twilio error")); // Alice fails
        handler.patroller = { name: "Jane Smith", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Jane Smith", checkin: "All Day" },
                { name: "Bob Jones", checkin: "All Day" },
                { name: "Alice Walker", checkin: "Half AM" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane Smith": "+15551111111",
            "Bob Jones": "+15552222222",
            "Alice Walker": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Hey!");
        expect(response.response).toContain("Message sent to 2 patrollers");
        expect(response.response).toContain("Could not send to: Alice Walker");
    });

    test('send_text_message should accept a message exactly at the limit', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Al", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Al", checkin: "All Day" },
                { name: "Bob", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Al": "+15551111111",
            "Bob": "+15552222222",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const max_length = handler.get_max_message_length("Al", "5551111111");
        const exact_message = "x".repeat(max_length);

        const response = await handler.send_text_message(exact_message);
        expect(response.response).toContain("Message sent to 2 patrollers");
        expect(mockCreate).toHaveBeenCalledTimes(2);
        // Verify the full message is exactly 160 characters
        const sent_body = (mockCreate.mock.calls[0][0] as any).body;
        expect(sent_body.length).toBe(SMS_MAX_LENGTH);
    });

    test('send_text_message should log the action with sent count', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Jane", checkin: "All Day" },
                { name: "Bob", checkin: "All Day" },
                { name: "Eve", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane": "+15551111111",
            "Bob": "+15552222222",
            "Eve": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        await handler.send_text_message("Test");
        expect(handler.log_action).toHaveBeenCalledWith("text_message(3)");
    });

    test('send_text_message should handle singular patroller in response', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        // Sender is NOT checked in, only Bob is on duty — 1 recipient
        handler.patroller = { name: "Jane", checkin: "" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Bob", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane": "+15551111111",
            "Bob": "+15552222222",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Hi!");
        // Singular "patroller" not "patrollers"
        expect(response.response).toBe("Message sent to 1 patroller and a copy to you.");
    });

    test('prompt_message should return error when no patrollers are logged in', async () => {
        handler.patroller = { name: "Al", checkin: "All Day" } as any;
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;

        const response = await handler.prompt_message();
        expect(response.response).toContain("No patrollers are currently logged in");
        expect(response.next_step).toBeUndefined();
    });

    test('prompt_message should show singular patroller when exactly one recipient', async () => {
        // Sender not checked in, only Bob on duty — 1 recipient
        handler.patroller = { name: "Jane", checkin: "" } as any;
        handler.from = "+15551111111";
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Bob", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;

        const response = await handler.prompt_message();
        expect(response.response).toContain("1 patroller,");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_MESSAGE);
    });

    test('prompt_message should return edge case for very long name', async () => {
        const longName = "A".repeat(SMS_MAX_LENGTH);
        handler.patroller = { name: longName, checkin: "All Day" } as any;
        handler.from = "+15551111111";
        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: longName, checkin: "All Day" },
                { name: "Bob", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;

        const response = await handler.prompt_message();
        expect(response.response).toContain("too long");
    });

    test('send_text_message should send to checked-out patrollers', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane", checkin: "" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Al", checkin: "All Day" },
                { name: "Bob", checkin: "Half AM" },
                { name: "Carol", checkin: "Half PM" },
                { name: "Dave", checkin: "Checked Out" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Al": "+15552222222",
            "Bob": "+15553333333",
            "Carol": "+15554444444",
            "Dave": "+15555555555",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Meeting at lodge");
        expect(response.response).toContain("Message sent to 4 patrollers and a copy to you.");
        expect(mockCreate).toHaveBeenCalledTimes(5); // 4 on-duty + 1 sender copy
    });

    test('send_text_message should accept GSM-7 special characters in message body', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Al", checkin: "All Day" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Al", checkin: "All Day" },
                { name: "Bob", checkin: "All Day" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Al": "+15551111111",
            "Bob": "+15552222222",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Price is $5!");
        expect(response.response).toContain("Message sent to 2 patrollers");
    });

    test('send_text_message should work when sender is not checked in', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane", checkin: "" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = {
            messages: { create: mockCreate },
        } as any;
        handler.to = "5551234567";

        const mockLoginSheet = {
            get_on_duty_patrollers: jest.fn<any>().mockReturnValue([
                { name: "Bob", checkin: "All Day" },
                { name: "Eve", checkin: "Checked Out" },
            ]),
        };
        handler.get_login_sheet = jest.fn<any>().mockResolvedValue(mockLoginSheet) as any;
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane": "+15551111111",
            "Bob": "+15552222222",
            "Eve": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_text_message("Update");
        // Sender is NOT on duty so they don't appear in on-duty list — only Bob and Eve
        expect(response.response).toContain("Message sent to 2 patrollers and a copy to you.");
        expect(mockCreate).toHaveBeenCalledTimes(3); // 2 on-duty + 1 sender copy
    });

    test('prompt_broadcast should return prompt with total patroller count', async () => {
        handler.patroller = { name: "Jane Smith" } as any;
        handler.from = "+15559876543";
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane Smith": "+15559876543",
            "Bob Jones": "+15552222222",
            "Alice Walker": "+15553333333",
        }) as any;

        const response = await handler.prompt_broadcast();
        const max_length = handler.get_max_message_length("Jane Smith", "5559876543");
        expect(response.response).toContain(`no more than ${max_length} plain-text characters`);
        expect(response.response).toContain("3 patrollers");
        expect(response.response).toContain("restart");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_BROADCAST);
    });

    test('prompt_broadcast should use singular when exactly one patroller', async () => {
        handler.patroller = { name: "Al" } as any;
        handler.from = "+15551111111";
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Al": "+15551111111",
        }) as any;

        const response = await handler.prompt_broadcast();
        expect(response.response).toContain("1 patroller,");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_BROADCAST);
    });

    test('prompt_broadcast should return error when phone map is empty', async () => {
        handler.patroller = { name: "Jane" } as any;
        handler.from = "+15551111111";
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({}) as any;

        const response = await handler.prompt_broadcast();
        expect(response.response).toContain("No patrollers with phone numbers found");
        expect(response.next_step).toBeUndefined();
    });

    test('prompt_broadcast should return error for very long sender name', async () => {
        const longName = "A".repeat(SMS_MAX_LENGTH);
        handler.patroller = { name: longName } as any;
        handler.from = "+15551111111";
        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            [longName]: "+15551111111",
            "Bob": "+15552222222",
        }) as any;

        const response = await handler.prompt_broadcast();
        expect(response.response).toContain("too long");
    });

    // send_broadcast_message tests

    test('send_broadcast_message should send to all patrollers in phone map', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane Smith" } as any;
        handler.from = "+15559876543";
        handler.twilio_client = { messages: { create: mockCreate } } as any;
        handler.to = "5551234567";

        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane Smith": "+15559876543",
            "Bob Jones": "+15552222222",
            "Alice Walker": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_broadcast_message("All hands on deck!");
        expect(response.response).toContain("Broadcast sent to 3 patrollers");
        expect(mockCreate).toHaveBeenCalledTimes(3);
        // Sender (Jane) is in the map so no extra copy
        expect(response.response).not.toContain("copy to you");
    });

    test('send_broadcast_message should include sender copy when sender not in phone map', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "NewGuy" } as any;
        handler.from = "+15550000000";
        handler.twilio_client = { messages: { create: mockCreate } } as any;
        handler.to = "5551234567";

        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Bob": "+15552222222",
            "Alice": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_broadcast_message("Message");
        expect(response.response).toContain("Broadcast sent to 2 patrollers and a copy to you.");
        expect(mockCreate).toHaveBeenCalledTimes(3); // Bob + Alice + sender copy
    });

    test('send_broadcast_message should reject non-GSM-7 characters', async () => {
        handler.patroller = { name: "Jane" } as any;
        handler.from = "+15551111111";

        const response = await handler.send_broadcast_message("Alert! \uD83D\uDCA5");
        expect(response.response).toContain("not supported in plain-text SMS");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_BROADCAST);
    });

    test('send_broadcast_message should reject messages exceeding the limit', async () => {
        handler.patroller = { name: "Jane" } as any;
        handler.from = "+15551111111";
        const max_length = handler.get_max_message_length("Jane", "5551111111");
        const too_long = "x".repeat(max_length + 1);

        const response = await handler.send_broadcast_message(too_long);
        expect(response.response).toContain("exceeds the limit");
        expect(response.response).toContain(`${max_length}`);
        expect(response.response).toContain("restart");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_BROADCAST);
    });

    test('send_broadcast_message should log the action with sent count', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.patroller = { name: "Jane" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = { messages: { create: mockCreate } } as any;
        handler.to = "5551234567";

        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Jane": "+15551111111",
            "Bob": "+15552222222",
            "Eve": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        await handler.send_broadcast_message("Update");
        expect(handler.log_action).toHaveBeenCalledWith("broadcast(3)");
    });

    test('send_broadcast_message should handle Twilio failures gracefully', async () => {
        const mockCreate = jest.fn<any>()
            .mockResolvedValueOnce({})  // Bob succeeds
            .mockRejectedValueOnce(new Error("Twilio error")); // Alice fails
        handler.patroller = { name: "Jane" } as any;
        handler.from = "+15551111111";
        handler.twilio_client = { messages: { create: mockCreate } } as any;
        handler.to = "5551234567";

        handler.get_phone_number_map = jest.fn<any>().mockResolvedValue({
            "Bob": "+15552222222",
            "Alice": "+15553333333",
        }) as any;
        handler.log_action = jest.fn<any>().mockResolvedValue(undefined) as any;

        const response = await handler.send_broadcast_message("Hi");
        expect(response.response).toContain("Broadcast sent to 1 patroller");
        expect(response.response).toContain("Could not send to: Alice");
        // Jane not in map so +1 copy attempt (succeeds → copy_sent_to_sender)
    });

    test('send_broadcast_message strips smart quotes and rejects with AWAIT_BROADCAST step', async () => {
        handler.patroller = { name: "Jane" } as any;
        handler.from = "+15551111111";

        const response = await handler.send_broadcast_message("He said \u201CHello\u201D");
        expect(response.response).toContain("not supported in plain-text SMS");
        expect(response.response).toContain("\u201C");
        expect(response.next_step).toBe(NEXT_STEPS.AWAIT_BROADCAST);
    });

    test('deliver_sms_to_map should not send copy when sender phone is in recipient map', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.from = "+15551111111";
        handler.to = "5551234567";
        handler.twilio_client = { messages: { create: mockCreate } } as any;

        const result = await handler.deliver_sms_to_map(
            { "Jane": "+15551111111", "Bob": "+15552222222" },
            "Test message",
            "Jane"
        );
        expect(mockCreate).toHaveBeenCalledTimes(2); // Jane + Bob, no extra copy
        expect(result.copy_sent_to_sender).toBe(false);
        expect(result.sent_count).toBe(2);
    });

    test('deliver_sms_to_map should send copy when sender phone is not in recipient map', async () => {
        const mockCreate = jest.fn<any>().mockResolvedValue({});
        handler.from = "+15550000000";
        handler.to = "5551234567";
        handler.twilio_client = { messages: { create: mockCreate } } as any;

        const result = await handler.deliver_sms_to_map(
            { "Bob": "+15552222222" },
            "Test message",
            "NewGuy"
        );
        expect(mockCreate).toHaveBeenCalledTimes(2); // Bob + sender copy
        expect(result.copy_sent_to_sender).toBe(true);
        expect(result.sent_count).toBe(1);
    });
});
