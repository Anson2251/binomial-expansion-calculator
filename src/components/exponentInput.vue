<script setup>
import { ref, watch, defineProps } from "vue"

const emit = defineEmits(['getExpo'])
// let exponentLocal = ref(null);

const props = defineProps({
    exponent: Number
})

const exponentLocal = ref(props.exponent);

watch(exponentLocal, () => {
    const num = exponentLocal.value !== "" ? Number(exponentLocal.value) : -1;
    emit('getExpo', num)
})

watch(props, () => {
    if(props.exponent >= 0) exponentLocal.value = props.exponent
})
</script>

<template>
    <label class=expressionLabel>
        <p class=description>Exponent:</p>
        <input v-model=exponentLocal type=number id=exponentInput />
    </label>
</template>

<style lang="less" scoped>
.expressionLabel {
    grid-column: 1 / 2;
    grid-row: 2;

    display: grid;
    grid-template-columns: auto 5em auto;
    grid-template-rows: auto;
    grid-gap: 8px;
    align-items: stretch;
    justify-content: start;
}

#exponentInput {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
}

.description {
	grid-column: 1;
	grid-row: 1;

	white-space: wrap;
    text-align: right;

    display: block;
    height: 1em;

    size: 1em;
	padding: 0.5em;
    margin: 0;
}
</style>