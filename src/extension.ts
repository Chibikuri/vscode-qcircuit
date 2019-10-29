import * as vscode from 'vscode';
import * as path from 'path';
import * as qgate from './qgates';


export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('qcircuit.basicgates', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        'Basic Quamntum Gates', // Identifies the type of the webview. Used internally
        'Quantum Gates', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
			localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'image'))]
		} // Webview options. More on these later.g
	  );

	  const stylePath = vscode.Uri.file(
		  path.join(context.extensionPath, 'style', 'style.css')
	  );

	  const imagePath = vscode.Uri.file(
        path.join(context.extensionPath, 'image/gates', 'hadamard.svg')
	  );
      // And get the special URI to use with the webview
	  const hadamardSrc = panel.webview.asWebviewUri(imagePath);
	  const styleSrc = panel.webview.asWebviewUri(stylePath);
	  panel.webview.html = getWebviewContent(styleSrc, hadamardSrc);
    })
  );
}

function getWebviewContent(style: vscode.Uri, imgpath: vscode.Uri) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <link rel="stylesheet" type="text/css" href="${style}">
	  <title>Basic Quantum Gates</title>
  </head>
  <body>
	<div class="gateset">
	<h1> Elemental Quantum Gates</h1>
	<h2> Single Qubit gate</h2>
	This gate is called Hadamard gate which we can make superposition
	from basis state.<br>
	` + qgate.hadamard + 
	`<br><br><br>This is pauliX gate<br><br>` 
		+qgate.pauliX+
	`<br><br><br>This is pauliY gate<br><br>`
		+qgate.pauliY+
	`<br><br><br>This is pauliZ gate<br><br>`
		+qgate.pauliZ+
	`<br><br><br>This is Rotation phase gate<br><br>`
	+	qgate.Rphase+
	`<br><br><br>This is U3 gate<br><br>`
	+ 	qgate.U3+
	`
  </div>
  </body>
  </html>
  `;
  }