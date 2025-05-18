<template>

    <router-view />
    

</template>

<script setup lang="ts">

import axios from 'axios';
import RezTabFile from './store/modules/RezTabFile';
import { useStore } from 'vuex';
import DevTest from './components/utils/DevTest.vue';
import { useDoc } from './composables/useDoc';
test()
async function test() {
  // const result = await axios.get(useStore().state.apiUrl + '/test/dbman')
  
  
  return
}
</script>
