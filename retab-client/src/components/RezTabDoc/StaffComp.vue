<template>
    <div>
        <!-- increase <span class="text-xl font-bold cursor-pointer"  @click="store.state.currentDoc.staves[props.staffIndex]?.addMeasure()">+</span> -->
        <div class="flex">
            {{ {staffXmlId: getStaff()?.xmlId,staffN: staffN} }}
             <TabGroupComp class="inline-block" :tabGroup="tabGroup" v-for="(tabGroup, index) in getStaff()?.tabGroups
             " :key="index" :tabgroupId="`${measureN}-${staffN}-${index}`"/>
            

        </div>
    </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'
import { useStore } from 'vuex';
import TabGroupComp from './TabGroupComp.vue';
import RezTabFile from '@/store/modules/RezTabFile';
const store = useStore();
const props = defineProps<{ 
    staffN?: number,
    measureN?: number
}>();

function getStaff() {
    return (store.state.currentDoc as RezTabFile).section.getMeasureFromN(props.measureN!)?.getStaffFromN(props.staffN)
      
}

</script>