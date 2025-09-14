<template>
    <div class="p-8">
        <div class="flex gap-3 w-full">

            Set header from previous Files:
            <va-select color="primary" class="w-full" :options="heads" v-model="selectedHead"
            
            :text-by="op => 'fwe' + (op as MeiHead)?.getWorkTitle()" @update:model-value="updateDocHead">
            <template #option-content="{ option }">
                <div v-if="option" class="text-white">
                    <!--    {{(option as MeiHead)?.getWorkTitle()}} - -->
                    {{ (option as MeiHead).getWorkTitle() }} - {{  }}
                </div>
            </template>
            <template #content>You can choose one...</template>
            
        </va-select>
    </div>
    </div>
</template>

<script setup lang="ts">
import { useDoc } from '@/composables/useDoc';
import { TEncoderHeader } from '@/store/modules/db-types';
import MeiHead from '@/store/modules/mei-modules/MeiHead';
import { TMeiTagFactoryArgs } from '@/store/modules/mei-modules/MeiTag';
import { onMounted, ref, watch } from 'vue';
const selectedHead = ref<MeiHead>();
const encoderHeaders = ref<TEncoderHeader[]>();

const heads = ref<MeiHead[]>();
onMounted(async () => {
    encoderHeaders.value = await MeiHead.getUserEncoderHeaders();
    
    
    heads.value = encoderHeaders.value?.map(eh => {
        delete eh.headerTag?.xmlId;
        delete eh.headerTag?.id
        return new MeiHead(eh.headerTag as TMeiTagFactoryArgs)
    })

})


async function updateDocHead(head: MeiHead) {
    await useDoc().initializeHead(head)
    useDoc().updateUI()
}
</script>