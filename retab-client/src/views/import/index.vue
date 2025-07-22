<template>
    <PanelLayout>
        <div>
            <h1 class="va-h3">
                Importer
            </h1>
            You can choose your .mei file here:
            <input type="file" @change="getTheFile" ref="fileInput" />
        </div>
    </PanelLayout>
</template>

<script setup lang="ts">
import PanelLayout from '@/components/PanelLayout.vue';
import RezTabFile from '@/store/modules/RezTabFile';
import { ref, watch } from 'vue';
const fileInput = ref();

function getTheFile(e: Event) {
    const file = fileInput.value.files[0]
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', e => {
        const doc = RezTabFile.instanceFromXmlString(e.target?.result as string)
        
    })
    fileReader.readAsText(file)

}


</script>