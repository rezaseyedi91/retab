<template>
  <div>

    <PanelLayout>
      <RouterView />
      <DocsList />
    </PanelLayout>
  </div>
</template>

<script setup lang="ts">
import DocsList from '@/components/doc/DocsList.vue';
import PanelLayout from '@/components/PanelLayout.vue';


</script>