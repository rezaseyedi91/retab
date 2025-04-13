<template>
    <div class="flex gap-x-2 my-2">
        <va-button @click="generate" class="">
            GENERATE DOC
        </va-button>
        <va-button @click="save" class=" font-bold cursor-pointer">
            SAVE
        </va-button>
        <DevTest>
            <va-button @click="logDoc" class=" font-bold cursor-pointer">
                Log Doc
            </va-button>

        </DevTest>
        <!-- <div>{{ getDoc().section.info.staves[0] }}</div> -->
    </div>
</template>


<script setup lang="ts">
import RezTabFile from '@/store/modules/RezTabFile';
import { ref } from 'vue';
import { useToast } from 'vuestic-ui/web-components';
import { useStore } from 'vuex';
import DevTest from './utils/DevTest.vue';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
async function generate() {
    const doc = store.state.currentDoc as RezTabFile;
    const result = await doc.generateMEI();
    const altTitle = doc.getAltTitle()
    RezTabFile.download(result, altTitle ? altTitle + '.mei' : undefined);
    doc.unfreeze()
    // setTimeout(() => {  }, 500)

}
const debugIntervalId = ref();
const toast = useToast();
async function save() {
    const doc = store.state.currentDoc as RezTabFile;
    let wannaRefreshThepage = !doc.id;
    const result = await doc.save();
    toast.init({
        color: 'success', message: 'Saved Successfully.',
        position: 'bottom-right'
    })


    
    doc.id = result.id
    doc.unfreeze();
    if (wannaRefreshThepage) {
        return  router.push({ path: '/doc/' + doc.id }), 1000
    } else return doc.unfreeze();
    
}
function getDoc() { return store.state.currentDoc as RezTabFile }
function logDoc() {
    const doc = getDoc()
    doc.setupNotesEls();
    console.log(doc.section.measures)
    // doc.getAllNotes().forEach(n => n.tabGroup.updateSelectionMode(false))
}
</script>