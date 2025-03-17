<template>

    <router-view />
    <!-- <button class="button my-5" @click="test">get Doc</button> -->

</template>

<script setup lang="ts">

import RezTabFile from './store/modules/RezTabFile';
async function test() {
  const sampleDocId = 5;
  const doc = await RezTabFile.getInstanceFromServer(sampleDocId)
}
</script>
