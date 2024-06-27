import * as vscode from 'vscode';
import { WSService } from './service/websock';
import { VSService } from './service/vs';

const wsService = new WSService();
const vsService = new VSService();

export function activate(context: vscode.ExtensionContext) {
	vsService.activate(context);
}
