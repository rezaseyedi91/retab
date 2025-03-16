<template>
    <div>
        <ul>
            <!-- <li>
                <label for="default-first-tabgrp-dursym-show" class="cursor-pointer">
                    Default First Tabgroup Duration Symbol Show
                    <input type="checkbox" id="default-first-tabgrp-dursym-show" v-model="getDoc().docSettings.defaultFirstTabgrpDurSymShow"/>
                </label>
            </li> -->
            <li class="flex gap-3">
                <button class="button"
                    @click="(store.state.currentDoc as RezTabFile).turnOnDefaultFirstTabgroupDurSymShow()">set first
                    durSyms</button>

                <button class="button" @click="getDoc().toggleTabgroupsIncludeDurAttribute()">
                    {{ (getDoc().docSettings.tabgroupsIncludeDurAttribute ? 'remove' : 'add') + ' Tab groups "dur" ' +
                    'attribute' }}
                </button>

            </li>
            <li>
                <ProportionSelector />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import RezTabFile from '@/store/modules/RezTabFile';
import { ref } from 'vue';
import { useStore } from 'vuex';
import ProportionSelector from './ProportionSelector.vue';
const someBoolean = ref(false)
const store = useStore();
function getDoc() {
    return store.state.currentDoc as RezTabFile
}

</script>

<style scoped>
li {
    padding: 1rem;
}

li:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}


.disabled {
    @apply font-normal
}

.enabled {
    @apply font-bold
}
</style>