<template>
    <div id="context-menu" v-if="store.state.ui.contextMenu.isOpen">
        few
        <h1 class="bg-gray-500 p-4 shadow-sm">this is the Context</h1>
    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { useStore } from 'vuex';

</script>