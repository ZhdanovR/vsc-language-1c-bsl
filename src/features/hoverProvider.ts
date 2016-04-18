import * as vscode from "vscode";
import SignatureHelpProvider from "./signatureHelpProvider";

export default class BSLHoverProvider extends SignatureHelpProvider implements vscode.HoverProvider {
    public provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Hover {
        var word = document.getText(document.getWordRangeAtPosition(position));
        var entry = this.new_globals[word.toLowerCase()];
        if (!entry || !entry.signature) {
            return null;
        }
        var description = [];
        description.push(entry.description);
        for (let element in entry.signature) {
            description.push({language: "1C (BSL)", value: "Процедура "+entry.name + entry.signature[element].СтрокаПараметров});
            // description.push("Параметры");
            for (let param in entry.signature[element].Параметры) {
                description.push(param + ": " + entry.signature[element].Параметры[param]);
            }
        } 
        return new vscode.Hover(description);
    }
}