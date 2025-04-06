<template>
    <div class="w-full tuning-preset-selector">
        <va-select label="preset" color="white" :options="presets" v-model="chosenPreset" text-by="title" @update:model-value="setTuning"
            class="w-full min-w-52 my-3">
            <template #option-content="{ option }">
                <div v-if="option" color="white">
                    <span class="pr-3">{{ (option as unknown as TTuningPreset).title! }}
                        <span v-if="(option as  unknown as TTuningPreset).title">:</span>    
                    </span>
                    <span v-for="(course) in (option as unknown as TTuningPreset).tuning" :key="course.n">
                        {{ course.pname }}<sub>{{ course.oct }}</sub><span class="px-2">|</span>
                    </span>
                    
                </div>
            </template>
        </va-select>
    </div>
</template>
<script setup lang="ts">
import { TTuningPreset } from '@/store/modules/db-types';
import RezTabFile from '@/store/modules/RezTabFile';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const props = defineProps<{staffIndex: number}>();
const emits = defineEmits(['addStaffLine', 'removeStaffLine']);
const presets = ref<TTuningPreset[]>();
const chosenPreset = ref<TTuningPreset>(presets.value?.[0] || {});
onMounted(async () => {
    presets.value = (await axios.get(useStore().state.apiUrl + '/retab/tuning-presets')).data;
    

})
const store = useStore();
async function setTuning(tuningPreset: TTuningPreset) {
    const doc = store.state.currentDoc as RezTabFile;
    const oldLength = doc.section.info.staves[props.staffIndex].tuning?.length;
    const newLength =  tuningPreset.tuning?.length;

    console.log('wanna set tuning', {newLength, oldLength})
    tuningPreset.tuning?.forEach(course => {
        const found = doc.section.info.staves[props.staffIndex].tuning?.find(staffLineTuning => staffLineTuning.n == course.n);
        if (found) {
            found.pname = course.pname;
            found.oct = course.oct
        } else {
            emits('addStaffLine', course)
        }

    })
    if ((oldLength || 0) - (newLength||0) > 0) {
        console.log('must remove ', oldLength! - newLength! , 'lines')
        for (const courseTuning of doc.section.info.staves[props.staffIndex].tuning?.slice(newLength) || [])  {
            emits('removeStaffLine', props.staffIndex, courseTuning.n)
        }
    }

    

}


</script>

<style scoped>
.tuning-preset-selector {
    --va-select-dropdown-background: black !important;
}
</style>