<template>
    <div class="" 
    v-if="store.state.isDev" >
        <slot/>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();
</script>

