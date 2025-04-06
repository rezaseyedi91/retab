<template>
    <div class="w-full">
        <TuningPresetSelector :staffIndex="0" 
        @addStaffLine="addStaffLine"
        @remove-staff-line="removeStaffLine"
        
        />
        <div class="xl:w-1/2 justify-start flex-col">
            <!-- <StaffLineTuning v-for="(staffLine, index) in store.state.currentDoc.section.measures[0].staves[0].lines" -->
            <StaffLineTuning v-for="(staffLine, index) in store.state.currentDoc.section.measures[0].staves[0].lines"
            :key="index + updateKey"
            :staffIndex="0"
            :tuning="getSection().info.staves[0].tuning?.find(l => l.n == (staffLine as StaffLine).courseInfo.number)"
            :staffLineN="(staffLine as StaffLine).courseInfo.number"
            @remove-staff-line="removeStaffLine"
            
            />
            
            <va-button :disabled="store.state.currentDoc.section.measures[0].staves[0].lines.length >= 14"
                class="bg-sky-950 w-32 h-12 mt-3 rounded-xl  text-white shadow-lg bg-gradient-to-t   py-2  text-6xl"
                type="button" @click="addStaffLine">+</va-button>
                
            </div>

            <DevTest>
                <va-button @click="() => console.log(getSection().info.staves[0].tuning)">
                    log tunings
                </va-button>
            </DevTest>

    </div>

</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import StaffLineTuning from './StaffLineTuning.vue';
import RezTabFile from '@/store/modules/RezTabFile';
import { StaffLine } from '@/store/modules/Staff';
import TuningPresetSelector from './TuningPreset/TuningPresetSelector.vue';
import { TTabCourseTuningInfo, TTuningPreset } from '@/store/modules/db-types';
import { ref } from 'vue';
import { TabCourseTuningInfo } from '@/store/modules/types';
import DevTest from '@/components/utils/DevTest.vue';
const store = useStore();
function getSection() { return (store.state.currentDoc as RezTabFile).section }
const updateKey = ref(Math.random());
function updateLines() {
    console.log('wanna update');
    
    updateKey.value = Math.random()}
function addStaffLine(tuningPreset?: TTabCourseTuningInfo) {

    const doc = store.state.currentDoc as RezTabFile;
    doc.section.addLineToStaff(tuningPreset, 0);
    updateLines()
    setTimeout(() => {
        doc.unfreeze()
    }, 500);

}


function removeStaffLine(staffIndex: number, lineN: number) { 
    (store.state.currentDoc as RezTabFile).section.removeLineFromStaff(staffIndex, lineN)
    store.state.currentDoc.unfreeze()
    updateLines()
 
}
</script>