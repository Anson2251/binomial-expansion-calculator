<script setup>
import { ref, watch } from "vue"

const emit = defineEmits(['getExpo'])
let exponent = ref(null);

watch(exponent, () => {
    const num  = exponent.value !== "" ? Number(exponent.value) : -1;
    emit('getExpo', num)
})
</script>

<template>
    <label class="label_exp">
        <input v-model=exponent type="number" name="exp" id="exp"/>
    </label>
</template>

<!-- <style lang="less" scoped>
.label_exp {
    grid-column: 1 / 3;
    grid-row: 3;

    display: grid;
    grid-template-columns: auto 3em;
    grid-template-rows: 100%;
    gap: 4px;
}

#btn_confirmExp {
    font-weight: bold;
    color: #000;

    grid-row: 1;
    grid-column: 2;

    margin: 0;
}

#exp {
    grid-column: 1;
    grid-row: 1;
    margin: 0;
}
</style> -->