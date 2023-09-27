import { bnmlExpCalc_util } from "./utils";
import katex from "katex";

document.getElementById("btn_confirmExp")!.addEventListener("click", () => {
    let expInput = (document.getElementById("exp") as HTMLInputElement)!.value;
    if(expInput !== null) document.getElementById("dislayExp")!.innerHTML = renderTexToHTML(`(a+b)^{${expInput}}=${getExp(Number(expInput))}`);
})

function getExp(n: number){
    let expression = bnmlExpCalc_util.expandBinomialExp(n);
    let expStr = [];

    for(let term of expression){
        if(term.coeff == 0) continue;
        expStr.push(
            `${(term.coeff != 1) ? term.coeff : ""}
            ${term.aExp != 0 ? `a^{${term.aExp != 1 ? term.aExp : ""}}` : ""}
            ${term.bExp != 0 ? `b^{${term.bExp != 1 ? term.bExp : ""}}` : ""}`
        );
    }

    return expStr.join("+");
}

/**
 * Renders a TeX string into HTML using KaTeX library.
 *
 * @param {string} tex - The TeX string to render.
 * @return {string} The rendered HTML string.
 */
function renderTexToHTML(tex: string): string{
    return katex.renderToString(tex, {output: "mathml", displayMode: true});
}

// Context from Code Snippet index.html:<!DOCTYPE html>