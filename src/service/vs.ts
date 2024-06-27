import * as vscode from 'vscode';
import { WSService } from './websock';
import { readFileSync } from 'fs';

export const VSOutput = vscode.window.createOutputChannel("WebCC");

export class VSService {
    public context!: vscode.ExtensionContext;
    public static instance: VSService;

    constructor() {
        VSService.instance = this;
    }

    public activate(context: vscode.ExtensionContext) {
        this.context = context;

        context.subscriptions.push(vscode.commands.registerCommand('webcc.start', () => { WSService.instance.init(); }));
        context.subscriptions.push(vscode.commands.registerCommand('webcc.stop', () => { WSService.instance.shutdown(); }));
        context.subscriptions.push(vscode.commands.registerCommand('webcc.runFile', () => { this.runFile(); }));
        context.subscriptions.push(vscode.commands.registerCommand('webcc.installFile', () => { this.installFile(); }));
        context.subscriptions.push(vscode.commands.registerCommand('webcc.runProgram', () => {  }));
        context.subscriptions.push(vscode.commands.registerCommand('webcc.copyInstall', () => { this.copyInstallUrl() }));
    }

    private runFile() {
        const text = vscode.window.activeTextEditor?.document.getText();
        for (const c of WSService.instance.computers) {
            c.send("execute", text);
        }
    }

    private installFile() {
        const text = vscode.window.activeTextEditor?.document.getText();
        for (const c of WSService.instance.computers) {
            c.send("install", text);
        }
    }

    private copyInstallUrl() {
        const code = readFileSync(`${VSService.instance.context.extensionPath}/assets/lua/cc.lua`).toString();
        vscode.env.clipboard.writeText(code);
    }
}
