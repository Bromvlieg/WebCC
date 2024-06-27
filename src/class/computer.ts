import { WebSocket } from "ws";
import { Logger } from "../service/log";
import { VSOutput, VSService } from "../service/vs";
import { readFileSync } from "fs";

export class Computer {
    private ws: WebSocket;
    private callbacks: {[id: string]: any} = [];

    constructor(ws: WebSocket) {
        this.ws = ws;

        this.callbacks['print'] = (str: string) => {
            VSOutput.appendLine(str);
            console.log(`[WebCC] ${str}`);
        };

        this.callbacks['install'] = (name: string) => {
            const code = readFileSync(`${VSService.instance.context.extensionPath}/assets/lua/install.lua`).toString();
            this.ws.send(code);
        };
    }

    public send(cmd: string, data: unknown) {
        this.ws.send(JSON.stringify({cmd: cmd, data: data}));
    }

    public onMsg(cmd: string, data: any) {
        if (!this.callbacks[cmd]) {
            Logger.log(`Unknown command recieved: '${cmd}'`)
            return;
        }

        this.callbacks[cmd](data);
    }
}