import * as vscode from 'vscode';
import { parser } from './parser';
import { htmlEncode } from './utils';

export class App {
  private previewPanel: vscode.WebviewPanel | null = null;

  async activate(context: vscode.ExtensionContext) {
    const registerCommand = vscode.commands.registerCommand;
    [registerCommand('markdown2confluence.openPreview', this.openPreviewToTheSide, this)].forEach((command) => context.subscriptions.push(command));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this));
  }

  onDidChangeTextDocument(event: any) {
    if (this.previewPanel && event.document.languageId === 'markdown') {
      this.refreshPreviewPanel();
    }
  }

  // 更新
  refreshPreviewPanel() {
    if (!vscode.window.activeTextEditor) return;
    const text = vscode.window.activeTextEditor.document.getText();
    const wike = parser(text);
    if (!this.previewPanel) {
      this.previewPanel = vscode.window.createWebviewPanel(
        'markdown2confluence',
        'preview',
        {
          viewColumn: 2,
          preserveFocus: true
        },
        {
          enableFindWidget: true,
          enableScripts: true
        }
      );
      this.previewPanel.onDidDispose(() => {
        this.previewPanel = null;
      });
    }
    this.previewPanel.webview.html = `<pre>${htmlEncode(wike)}</pre>`;
  }

  openPreviewToTheSide() {
    this.refreshPreviewPanel();
  }
}

export default new App();
