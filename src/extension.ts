import * as vscode from 'vscode';
import app from './App';

export function activate(context: vscode.ExtensionContext) {
  app.activate(context);
}
