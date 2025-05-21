<template>
    <div>
        <ul>
            <!-- <li>
                <label for="default-first-tabgrp-dursym-show" class="cursor-pointer">
                    Default First Tabgroup Duration Symbol Show
                    <input type="checkbox" id="default-first-tabgrp-dursym-show" v-model="getDoc().docSettings.defaultFirstTabgrpDurSymShow"/>
                </label>
            </li> -->
            <li class="flex gap-3 items-center">
                <va-button color="onPrimary"
                @click="(store.state.currentDoc as RezTabFile).turnOnDefaultFirstTabgroupDurSymShow()">
                set first durSyms</va-button>
                <va-button color="onPrimary"
                @click="(store.state.currentDoc as RezTabFile).turnOnDefaultFirstTabgroupDurSymShow({ resetEachMeasure: true })">
                set first durSyms (reset each measure)</va-button>
                
                <va-button color="onPrimary"
                @click="useDoc().toggleTabgroupsIncludeDurAttribute()">
                    {{ (useDoc().docSettings.tabgroupsIncludeDurAttribute ? 'remove' : 'add') + ' Tab groups "dur" ' +
                        'attribute' }}
                </va-button>

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
import { useDoc } from '@/composables/useDoc';
const someBoolean = ref(false)
const store = useStore();
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