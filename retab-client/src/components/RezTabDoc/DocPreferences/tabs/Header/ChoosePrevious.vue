<template>
    <div class="p-8">
        Set header from previous Files: 
        {{ selectedHead?.tagTitle }}
        <va-select color="primary" 
            :options="heads"
            v-model="selectedHead"
            :text-by="op => op?.toString()"
            @update:model-value="updateDocHead"
            >
                <template #option-content="{ option }">
                    <div v-if="option" class="text-white">
                    {{(option as MeiHead)?.getWorkTitle()}}
                    
                </div>
            </template>
    
    </va-select>
    </div>
</template>

<script setup lang="ts">
import { useDoc } from '@/composables/useDoc';
import { TEncoderHeader } from '@/store/modules/db-types';
import MeiHead from '@/store/modules/mei-modules/MeiHead';
import { TMeiTagFactoryArgs } from '@/store/modules/mei-modules/MeiTag';
import { onMounted, ref } from 'vue';
    const selectedHead = ref<MeiHead>();
    const encoderHeaders = ref<TEncoderHeader[]>();
    const heads = ref<MeiHead[]>();
    onMounted(async () => {
        encoderHeaders.value = await MeiHead.getUserEncoderHeaders();
        heads.value = encoderHeaders.value?.map(eh => {
            return new MeiHead(eh.headerTag as TMeiTagFactoryArgs)
        })
        
    })
    
    async function updateDocHead(head: MeiHead) {
        await useDoc().initializeHead(head)
            useDoc().updateUI()
    }
</script>