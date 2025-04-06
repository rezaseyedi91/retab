<template>
    <div class="flex p-1  ">
        <div v-if="!tuning">
            NO TUNING {{ {staffLineN} }}
        </div>
        <div v-else class="w-fit flex gap-x-3 grid-cols-3 items-center">
            <va-input color="white" label="course" class="w-12 text-center" type="text" v-model="tuning.n" disabled />
            <va-input color="white" label="pname" class="w-12 text-center" type="text" v-model="tuning.pname"
                placeholder="pname" />
            <va-input color="white" label="oct" class="w-12 text-center" type="text" v-model="tuning.oct"
                placeholder="oct" />
            <button class="flex items-center fill-red-400 text-red-900 opacity-50 cursor-pointer hover:opacity-60"
                @click="$emit('removeStaffLine', staffIndex, staffLineN)">
                <XMarkIcon class="w-8 self-center" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RezTabFile from '@/store/modules/RezTabFile';
import { StaffLine } from '@/store/modules/Staff';
import { TabCourseTuningInfo } from '@/store/modules/types';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { useStore } from 'vuex';

const props = defineProps<{
    tuning?: TabCourseTuningInfo, staffLineN: number,
    staffIndex: number
}>()

const store = useStore();
const emits = defineEmits(['removeStaffLine'])

</script>
