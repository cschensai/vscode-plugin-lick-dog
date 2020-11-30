// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const axios = require('axios');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// 这里的代码将只会在插件激活时执行一次
	console.log('Congratulations, your extension "lick-dog" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let lickDogApi = vscode.commands.registerCommand('lick-dog.helloWorld', async () => {
		// 这里的代码每次执行 这个命令 的时候都会被执行
		// 显示弹窗
		// vscode.window.showInformationMessage('Hello World from remind_me!');
		// 只能是https格式
		try {
			const res = await axios.get('https://api.tianapi.com/txapi/tiangou/index', {
				params: {
					key: 'c732ed00482b7208218faf599e32239a',
				}
			})
			const { code, newslist = [] } = res.data;
			if (code === 200) {
				const [obj] = newslist;
				vscode.window.showInformationMessage(
					`舔狗你好：
					 ${obj.content}
					`);
			}
		} catch (error) {
			console.log('error', error);
		}
		
	});

	context.subscriptions.push(lickDogApi);
}

// this method is called when your extension is deactivated
export function deactivate() {}
