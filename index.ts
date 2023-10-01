import { bnmlExpCalc_util } from "./utils";
import katex from "katex";

let btn_confirmExp = document.getElementById("btn_confirmExp"); // the calc button
let inpbox_getExp = document.getElementById("exp") as HTMLInputElement; // the input box
let box_displayExp = document.getElementById("dislayExp"); // the area to display the expanded expression

if (btn_confirmExp && inpbox_getExp && box_displayExp) {
    btn_confirmExp.addEventListener("click", () => {
        let expInput = inpbox_getExp.value;
        if (expInput !== "") expandExp(box_displayExp!, Number(expInput));
    });

    inpbox_getExp.addEventListener("keyup", (e: KeyboardEvent) => {
        let expInput = inpbox_getExp.value;
        if (e.key == "Enter" && expInput !== "") expandExp(box_displayExp!, Number(expInput));
    });
}else{
    console.error('some essential elements of the calculator cannot be accessed');
    console.log(`calc button: ${btn_confirmExp}\ninput box: ${inpbox_getExp}\ndisplay box: ${box_displayExp}`);
}

function expandExp(displayExp: HTMLElement, exp: number) {
    displayExp.innerHTML = renderTexToHTML(`(a+b)^{${exp}}=${getExp(exp)}`);
}

function getExp(n: number) {
    let expression = bnmlExpCalc_util.expandBinomialExp(n);
    let expStr = [];

    for (let term of expression) {
        if (term.coeff == 0) continue;
        expStr.push(
            `${(term.coeff != 1) ? term.coeff : ""}
            ${term.aExp != 0 ? `a^{${term.aExp != 1 ? term.aExp : ""}}` : ""}
            ${term.bExp != 0 ? `b^{${term.bExp != 1 ? term.bExp : ""}}` : ""}`
        ); // get each term of expanded expression
    }

    return expStr.join("+");
}

/**
 * Renders a TeX string into HTML using KaTeX library.
 *
 * @param {string} tex - The TeX string to render.
 * @return {string} The rendered HTML string.
 */
function renderTexToHTML(tex: string): string {
    return katex.renderToString(tex, { output: "mathml", displayMode: true });
}

// Context from Code Snippet index.html:<!DOCTYPE html>