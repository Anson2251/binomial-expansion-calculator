<script setup lang="ts">
import {ref} from "vue";
import exponentInput from "./components/exponentInput.vue";
import binomialExpansion from "./components/binomialExpansion.vue";

let exponent = ref(0)

function parent(num: number){
  exponent.value = num;
}
</script>

<template>
  <div class="container">
        <h2>Expand Binomial Expression</h2>
        <p class="textExp">Enter the exponent of the binomial expression</p>
        <exponentInput @getExpo="parent"/>
        <binomialExpansion :exponent="exponent"/>
    </div>
</template>

<style scoped lang="less">
@import url("/src/assets/main.less");
</style>
