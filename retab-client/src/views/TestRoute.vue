<template>
<div></div>
</template>

<script setup lang="ts">
import DevTest from '@/components/utils/DevTest.vue'
import { useDoc } from '@/composables/useDoc';
import RezTabFile from '@/store/modules/RezTabFile';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const doc = useDoc();

async function test() {
    return 
}

</script>