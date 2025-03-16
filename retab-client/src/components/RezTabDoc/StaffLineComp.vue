<template>
    <div class="
    border-t-1 border-solid border-gray-500 h-8 staff-line relative
    flex flex-col justify-center 
    " :class="{'ledger-line': line.isLedgerLine, 'show-ledger-line':showLedgerLine}">
        <!-- <NoteComp v-for="(note, index) in tabGroup.notes.filter(n => n.course == line.courseInfo.number)" :key="index * store.state.utils.keyCoefficient"
            :tabGroup="tabGroup" :line="line" /> -->
            <!-- {{ line.isLedgerLine }} -->
        <NoteComp :tabGroup="tabGroup" :line="line" />
    </div>

</template>

<script setup lang="ts">
import { StaffLine } from '@/store/modules/Staff';
import NoteComp from './NoteComp.vue';
import { computed, defineProps, ref } from 'vue';
import TabGroup from '@/store/modules/TabGroup';
import { useStore } from 'vuex';
const store = useStore()
const props = defineProps<{
    line: StaffLine,
    tabGroup: TabGroup
}>()
const showLedgerLine = computed(() => props.tabGroup.showLedgerLines(props.line.courseInfo.number))
</script>

<style scoped>
.staff-line:not(.ledger-line)::before, .ledger-line.show-ledger-line::before {
    content: '';
    position: absolute;
    height: 1px;
    bottom: 45%;
    width: 100%;
    display: block;
    background-color: rgb(0, 0, 0, .2);

}
.ledger-line.show-ledger-line::before {
    width: 50%;
}
</style>