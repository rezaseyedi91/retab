<template>
    <DevTest>
        <div class="p-12">
            <br>
            <va-button @click="getThem">Get All Infected Docs</va-button>
            <va-list>
                <va-list-item :key="d" v-for="d in allDocs.map(d => d.id + ': ' + d.getTitle() + ' | ' + d.getAltTitle())">
                    {{ d }}
                </va-list-item>
            </va-list>
        </div>
    </DevTest>
</template>

<script setup lang="ts">
import DevTest from '@/components/utils/DevTest.vue'
import { useDoc } from '@/composables/useDoc';
import RezTabFile from '@/store/modules/RezTabFile';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const doc = useDoc();
const infectedDocsIds = ref([
    // 475, 476, 477, 478, 479, 480, 481, 482, 483, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513
    471
])

const allDocs = ref<RezTabFile[]>([]);
async function getThem() {
    for (const id of infectedDocsIds.value) {
        await setDoc(id);

        await (store.state.curretDoc as RezTabFile).generateAndDownloadMei();

        await new Promise<void>(r => setTimeout(r, 500))
    }
    
}

async function setDoc(id: number) {
    allDocs.value.push(await  RezTabFile.getInstanceFromServer(id))
    store.state.curretDoc =  await RezTabFile.getInstanceFromServer(id);
}



</script>