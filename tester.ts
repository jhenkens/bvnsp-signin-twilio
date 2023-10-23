import * as readline from "readline";
import "dotenv/config";
import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";

const DEFAULT_FROM_NUMBER: string | undefined = process.env.DEFAULT_FROM_NUMBER;
const DEFAULT_TO_NUMBER: string | undefined = process.env.DEFAULT_TO_NUMBER;

async function question(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => rl.question(query, resolve)).then(
        (resp) => {
            rl.close();
            return resp;
        }
    );
}

async function* questions(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try {
        for (;;) {
            yield new Promise((resolve) => rl.question(query, resolve));
        }
    } finally {
        rl.close();
    }
}
async function run() {
    let fromNumber: string = (await question(
        `Enter a from phone number [${DEFAULT_FROM_NUMBER}]:`
    )) as string;
    if (fromNumber == "") {
        fromNumber = DEFAULT_FROM_NUMBER!;
    }
    let toNumber: string = "";
    if (DEFAULT_TO_NUMBER == undefined) {
        toNumber = (await question(
            `Enter a to phone number [${DEFAULT_FROM_NUMBER}]:`
        )) as string;
        if (toNumber == "") {
            toNumber = DEFAULT_TO_NUMBER!;
        }
    } else {
        toNumber = DEFAULT_TO_NUMBER;
    }
    let next_step: string | null = null;
    for await (const answer of questions(
        `Enter a message from ${fromNumber}: `
    )) {
        const body: string = answer as string;
        if (answer == "done") break;
        const params = {
            To: toNumber,
            test_number: fromNumber,
            Body: body,
        };
        const url =
            `http://localhost:3000/handler?` + new URLSearchParams(params);
        console.log(`Calling ${url} with next_step: ${next_step}`);
        const opts: { headers: any } = { headers: undefined };
        if (next_step != null) {
            opts.headers = { cookie: `bvnsp_checkin_next_step=${next_step}` };
        }

        const response = await fetch(url, opts);

        const parser = new XMLParser();
        const responseBody = await response.text();
        let xmlObj = parser.parse(responseBody);

        const responseText = xmlObj["Response"]["Message"];
        const set_cookie = (response.headers as any).raw()["set-cookie"] as
            | string[]
            | null;
        
            if (set_cookie != null) {
            const next_step_cookie = set_cookie
                .filter((x) => x.startsWith("bvnsp_checkin_next_step="))[0];
            const next_step_value = next_step_cookie.split("=")[1];
            next_step = next_step_value;
        }
        console.log("\n" + responseText + "\n");
    }
}

run(); // For the sake of example, start the async function at the top level of nodejs script
