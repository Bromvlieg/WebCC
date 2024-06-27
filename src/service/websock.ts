import { Server, WebSocket } from "ws";
import * as vscode from "vscode";
import { Logger } from "./log";
import { Computer } from "../class/computer";

export class WSService {
	private ws!: Server;
    public static instance: WSService;
    public computers: Computer[] = [];

    constructor() {
        WSService.instance = this;
    }

	public init() {
		const port = 27055;

		this.ws = new Server({ port });
		this.ws.on("listening", () => {
			Logger.log("Ready for connections!");
		});

		this.ws.on("error", (err) => {
			Logger.log(`${err.name}\n${err.message}\n${err.stack}`);
		});

		this.ws.on("connection", (ws: WebSocket) => {
			Logger.log(`A new computer connected!`);

            const computer = new Computer(ws);
            this.computers.push(computer);

			ws.on("message", (message: string) => {
                const msg: any = JSON.parse(message);
                computer.onMsg(msg.cmd, msg.data);
			});

			ws.on("close", () => {
                Logger.log(`Computer '${computer.name}' disconnected!`);
                this.computers = this.computers.filter((x) => x != computer);
			});
		});

		Logger.log(`WSService init`);
	}

    public shutdown() {
		Logger.log(`WSService shutdown`);
        this.ws.close();
    }
}
