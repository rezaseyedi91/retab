<template>
  <PanelLayout>
    <RezTabDoc :id="($router.currentRoute.value.params.id as string)" />
    <MeiGenerator />
  </PanelLayout>
</template>

<script lang="ts" setup>
import MeiGenerator from '@/components/MeiGenerator.vue';
import PanelLayout from '@/components/PanelLayout.vue';
import RezTabDoc from '@/components/RezTabDoc/indexDoc.vue'
import RezTabFile from '@/store/modules/RezTabFile';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
/**const inst = new RezTabFile({
  createdAt: new Date(),
  filename: 'file-one.txt',
  instruments: [Instrumnet.LUTE],
  tabType: TabType.ITALIAN
}).init()*/

const store = useStore();
// onMounted(() => {
  
// })

</script>