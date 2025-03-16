<template>
    <div  class="w-fit font-bold" :class="{'fill-white': isConnected, 'opacity-20': !isConnected}">
        <WifiIcon class="w-8" />
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {WifiIcon}from '@heroicons/vue/24/solid'
const isConnected = ref(false);
const status = ref('NOTHING YET')
const store = useStore();
onMounted(async () => {
    
    axios.get(store.state.apiUrl).then(res => {
        status.value = res.data
        if (res.status == 200) isConnected.value = true
    }).catch(err => {
        status.value = err
    })
})


</script>