import * as vscode from 'vscode';
import { VSOutput } from './vs';

export class Logger {
    public static log(msg: string) {
        vscode.window.showInformationMessage(`[WebCC] ${msg}`);
        VSOutput.appendLine(`[WebCC] ${msg}`);
        console.log(`[WebCC] ${msg}`);
    }
}