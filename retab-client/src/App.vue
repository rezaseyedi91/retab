<template>
  <PanelLayout >
    <router-view />
    <!-- <button class="button my-5" @click="test">get Doc</button> -->
  </PanelLayout>
</template>

<script setup lang="ts">
import PanelLayout from './components/PanelLayout.vue';

import RezTabFile from './store/modules/RezTabFile';
async function test() {
  const sampleDocId = 5;
  const doc = await RezTabFile.getInstanceFromServer(sampleDocId)
}
</script>
