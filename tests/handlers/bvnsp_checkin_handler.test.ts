import { Context, ServerlessEventObject } from "@twilio-labs/serverless-runtime-types/types";
import BVNSPCheckinHandler, { HandlerEvent, BVNSPCheckinResponse } from "../../src/handlers/bvnsp_checkin_handler";
import { CONFIG } from "../../src/env/handler_config";
import { CheckinValues } from "../../src/utils/checkin_values";
import { SectionValues } from "../../src/utils/section_values";

describe('BVNSPCheckinHandler', () => {
    let context: Context<any>;
    let event: ServerlessEventObject<HandlerEvent>;
    let handler: BVNSPCheckinHandler;

    beforeEach(() => {
        context = {
            getTwilioClient: jest.fn().mockReturnValue({
                messages: {
                    create: jest.fn()
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

});