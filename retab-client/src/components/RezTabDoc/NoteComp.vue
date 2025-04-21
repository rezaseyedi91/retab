<template>
  <!-- <div v-if="note"
      class="align-middle cursor-crosshair"
      
      @click="store.state.ui.editingNote = note!"
      :class="{ 'text-green-600': store.state.ui.editingNote?.id == note?.id }"
    >
      {{ note?.fret || 0 }} 
    </div>-->
  <!--  v-else -->
  <div v-if="note">
    <!-- :placeholder="'c-' + note.course" 
    @focus="onFocus()"
    -->
      
    <input @keydown.space="onSpace" 
     autocomplete="false"
    @paste="(e) => {e.preventDefault()}" 
    @keyup="keyup" 
    @keydown="keydown" 
    @keypress="keypress"
    @focus="onNoteInputFocus"
      class="note-input p-1 w-8 border-1 border-red border-solid" 
      maxlength="2" 
      type="string" 
      v-model="note.fret"
      :id="note.xmlId"
      
      />
  </div>
</template>

<script lang="ts" setup>
import RezTabFile from "@/store/modules/RezTabFile";
import { StaffLine } from "@/store/modules/Staff";
import TabGroup from "@/store/modules/TabGroup";
import { DurNum } from "@/store/modules/types";
import { computed, defineProps, onMounted, onUpdated, ref, ComputedRef } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps<{
  tabGroup: TabGroup;
  line: StaffLine;
}>();


// props.tabGroup.notes.find(n => n.course == props.line.courseInfo.number)!)
const note = computed( () => props.tabGroup.getNoteOnCourse(props.line.courseInfo.number)!);
function onSpace() {
  event?.preventDefault();
  const newTabGroup = props.tabGroup.staff.addTabGroup();
  newTabGroup.setDur(props.tabGroup.dur)
  const newNoteOnTheSameCourse = newTabGroup.notes.find(n => n.course == note.value.course)
  setTimeout(() => {
    newNoteOnTheSameCourse?.focus()
  }, 50)
}
onMounted(() => {
  note.value?.setupEl();
})
onUpdated(() => {
  // 
})

function keypress(event: KeyboardEvent) {
  if (event.key == 'Insert' && event.shiftKey) event.preventDefault();

}
function keydown(event: KeyboardEvent) {

  if (event.key == '.' || event.key == 'p') {

    event.stopPropagation()
    event.preventDefault();
    
    note.value.tabGroup.dot()
    return false
  }
  
}
function onNoteInputFocus() {
  const doc = (store.state.currentDoc as RezTabFile);
  doc.lastFocusedNote = note.value
  return;
}

function keyup(event: KeyboardEvent) {
  if (event.key == 'D') {
    console.log(note.value.getDebugElData())
  }
  // change the durSym:
  if (event.altKey) {
    event.preventDefault()
    const currentDuration = note.value.tabGroup.dur;
    const newDuration: DurNum | undefined = ["ArrowUp", "ArrowRight"].includes(event.key) ? currentDuration / 2 as DurNum :
      ["ArrowDown", "ArrowLeft"].includes(event.key) ? currentDuration * 2 as DurNum
        : undefined;
    if (newDuration) note.value.changeDuration(newDuration)
    return;

  } else if (event.shiftKey) {
    if (event.key == 'Delete') {
      event.preventDefault()
      const prevNoteToFocus = note.value.getLeftNote();
      note.value.tabGroup.remove();
      prevNoteToFocus?.focus();
      return false;
      
    } else if (event.key == 'Insert') {
      event.preventDefault()
      note.value.tabGroup.insertTabgroupBefore();
      note.value.getLeftNote()?.focus()
    }
  } else if (event.ctrlKey) {
    if (event.key == 'Insert') {
      event.preventDefault()
      // wanna insert a measure before the current one:
      const currentMeasureIndex = note.value.tabGroup.staff.measure.section.measures.indexOf(note.value.tabGroup.staff.measure)
      const newMeasure = note.value.tabGroup.staff.measure.section?.addMeasure(currentMeasureIndex);
      newMeasure.findCurrentStaff(note.value).tabGroups[0].focus(note.value.course)
      // const prevNoteToFocus = note.value.getLeftNote();
      // note.value.tabGroup.remove();
      // prevNoteToFocus?.focus()

    }
  } else {
    const otherNote = event.key == "ArrowUp" ? note.value.getAboveNote()
      : event.key == "ArrowDown" ? note.value.getBelowNote()
        : event.key == "ArrowRight" ? note.value.getRightNote()
          : event.key == "ArrowLeft" ? note.value.getLeftNote()
            : undefined;
    otherNote?.focus();
  }
}
// function onFocus() {
//   
// }
</script>



<style scoped>
.note-input:hover {
  background-color: rgba(0, 0, 0, 0.089) !important;
}
.note-input {
  background-color: unset !important;
  outline: red;
}


.note-input.selected {
  color: rgb(12, 202, 12) !important;

}
</style>