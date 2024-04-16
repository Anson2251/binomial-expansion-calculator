<script setup lang="ts">
import { ref } from "vue";
import exponentInput from "./components/exponentInput.vue";
import binomialExpansion from "./components/binomialExpansion.vue";

const exponent = ref(0);

const updateExponent = (num: number) => exponent.value = num

</script>

<template>
	<div class=container>
		<h2 class=title>Expand Binomial Expression</h2>
		<exponentInput :exponent="exponent" @getExpo="updateExponent" />
		<binomialExpansion :exponent="exponent" @getExpo="updateExponent"/>
	</div>
</template>

<style scoped lang="less">
.container {
	grid-column: 1;
	grid-row: 1;

	width: var(--containerWidth);
	height: var(--containerHeight);
	padding: 2em;

	border-radius: 8px;
	box-shadow: var(--shadowContainer);

	display: grid;
	justify-content: stretch;
	align-content: stretch;
	grid-template-columns: auto;
	grid-template-rows: 2em 2em auto;
	grid-gap: 8px;
}

.title {
	display: block;

	overflow: hidden;
	white-space: nowrap;
	overflow-x: scroll;

	grid-column: 1 / 2;
	grid-row: 1;

	margin: 0;
	padding: 0;
	text-align: center;
}
</style>
