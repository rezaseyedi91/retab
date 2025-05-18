<template>
    <div class="my-5 border-brown-100 rounded-lg border-2 p-5" 
    v-if="store.state.isDev" >
        <slot/>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();


</script>

