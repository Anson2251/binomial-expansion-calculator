<script setup lang="ts">
import { ref, defineProps, watch } from "vue"
import { bnmlExpCalc_util } from "../utils.ts";
import katex from "katex";

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

function renderTexToHTML(tex: string): string {
    return katex.renderToString(tex, { output: "mathml", displayMode: true });
}

const expand = (exp: number) => displayExpHTML.value = renderTexToHTML(`(a+b)^{${exp}}=${getExp(exp)}`);

const props = defineProps({
  exponent: Number
})

watch(props, () => {
    if (props.exponent && props.exponent > 0) {
        if(props.exponent > 500) {
            if(confirm("Too big exponent, it may cause a lot of time to calculate. \n\nAre you sure you want to continue?"))  expand(props.exponent);
        }else{
            expand(props.exponent);
        }
    }else{
        displayExpHTML.value = props.exponent === 0 ? 1 : ""
    }
});

let displayExpHTML = ref("")
</script>

<template>
    <div class="result">
        <div id="dislayExp" :innerHTML="displayExpHTML"></div>
    </div>
</template>
