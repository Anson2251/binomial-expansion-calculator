<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from "vue"
import utils from "../utils";
import katex from "katex";

function getExpression(n: number) {
    let expression = utils.getBinomialExpansion(n);
    let terms = [];

    for (let term of expression) {
        if (term.coefficient == 0) continue;
        terms.push(
            `${(term.coefficient != 1) ? term.coefficient : ""}
            ${term.exponentA != 0 ? `a^{${(term.exponentA != 1) ? term.exponentA : ""}}` : ""}
            ${term.exponentB != 0 ? `b^{${(term.exponentB != 1) ? term.exponentB : ""}}` : ""}` // ignore the exponent 1
        ); // get each term of expanded expression
    }

    return terms.join("+");
}

function renderTexToHTML(tex: string): string {
    return katex.renderToString(tex, { output: "mathml", displayMode: true });
}

function expand(exp: number) {
    if(exp < 0) return;
    let useHistory = false
    for (const item of expansionHistory) {
        if (item.exponent === exp) {
            displayExpressionHTML.value = item.expression;
            useHistory = true;
        }
    }
    if(!useHistory){
        const mathmlStr = renderTexToHTML(`(a+b)^{${exp}}=${getExpression(exp)}`);
        displayExpressionHTML.value = mathmlStr;
        preserveHistory(exp, mathmlStr);
    }
}

const emit = defineEmits(['getExpo'])
const props = defineProps({
    exponent: Number
})

const greatExponentWarning = "A huge exponent! A lot of terms will be displayed and it will take a long time to calculate \n\n Continue?";
const placeholderFor0 = "<span>1</span>";


let expansionHistory: { exponent: number, expression: string }[] = []
function preserveHistory(exp: number, mathml: string) {
    expansionHistory.push({ exponent: exp, expression: mathml });
}

watch(props, () => {
    if (props.exponent && props.exponent > 0) {
        if (props.exponent > 500) {
            if (confirm(greatExponentWarning)) expand(props.exponent);
            else {
                emit('getExpo', expansionHistory[expansionHistory.length - 1].exponent);
            }
        } else {
            expand(props.exponent);
        }
    } else {
        displayExpressionHTML.value = (props.exponent === 0) ? placeholderFor0 : "";
    }
});

let displayExpressionHTML = ref(placeholderFor0)
</script>

<template>
    <div class=result>
        <div id=dislayExp :innerHTML=displayExpressionHTML></div>
    </div>
</template>

<style>
.result {
    grid-column: 1 / 2;
    grid-row: 3;

    border-radius: 8px;
    background-color: var(--backgroundColour2);
    box-shadow: var(--shadowDisplayBox);

    overflow: auto;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
}

#dislayExp {
    min-width: calc(100% - 64px);
    height: 100%;

    white-space: nowrap;

    display: flex;
    align-items: center;

    text-align: center;
    color: #555;
    font-size: 1.3em;
    font-family: 'TeX Gyre Pagella Math', 'STIX Two Math', 'Latin Modern Math', 'TeX Gyre Termes', "Cambria Math", serif !important;

    >span {
        padding-left: 2em;
        padding-right: 2em;
    }
}
</style>
