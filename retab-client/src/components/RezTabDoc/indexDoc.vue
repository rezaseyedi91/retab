<template>
    
    <DevTest>
        <!-- {{ (store.state.currentDoc as RezTabFile).docSettings.proportion }} -->

    </DevTest>
    <div class="p-4" v-if="isLoaded" ref="retabDocContainer">
        <!-- <va-button @click="debugSL">SL</va-button> -->
        <h2 class="mb-5 va-h6">{{ (store.state.currentDoc as RezTabFile).getAltTitle() }}</h2>
        <div class="section flex max-w-full overflow-x-auto">
            <MeasureComp :measure-n="(measure as Measure).n"
                v-for="(measure, index) in store.state.currentDoc.section.measures" :measure="measure" :key="index">
            </MeasureComp>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, onUnmounted, ref, shallowRef, toRefs } from 'vue';
import RezTabFile from '@/store/modules/RezTabFile'
import Measure from '@/store/modules/Measure';
import { useStore } from 'vuex';
import MeasureComp from './MeasureComp.vue';
import { Instrumnet, TabType } from '@/store/modules/types';
import Note from '@/store/modules/Note';
import TabGroup from '@/store/modules/TabGroup';
import DevTest from '../utils/DevTest.vue';
const store = useStore();

const props = defineProps<{
    id: string
}>();
const retabDocContainer = ref<HTMLElement>();
class SelectionListener {
    selectedNotes: Note[] = []
    selectedNotesDuringCurrentDrag: Note[] = [];
    clipboard: Note[] = []

    static HIGHLIGH_ELEMENT_ID = 'retab-selection-highlight'
    private el: HTMLElement;
    /** // minX, minY, maxX, maxY */
    selectionHighlighterXYs: [number, number, number, number] = [0, 0, 0, 0]
    private selectionEl?: HTMLElement;
    shiftIsDown = false;
    isSelecting = false;
    private startPos?: [number, number];
    private endPos?: [number, number];
    constructor(el: HTMLElement) {
        this.el = el;
        this.initSelectionHighlighterEl()
    }
    boundMethodNames = {
        initialListeners: [
            'onCtrl',
            'onShiftkeyDown',
            'onShiftkeyUp',
            'onSelectStart',
            'onMouseDown',
            'onMouseUp',
            'onMouseMove',
        ]
    };
    boundMethods: { [x: string]: { eventType: keyof DocumentEventMap, method: any } } = {
        'onCtrl': { eventType: 'keydown', method: this.onCtrl.bind(this) },
        'onShiftkeyDown': { eventType: 'keydown', method: this.onShiftkeyDown.bind(this) },
        'onShiftkeyUp': { eventType: 'keyup', method: this.onShiftkeyUp.bind(this) },
        'onSelectStart': { eventType: 'selectstart', method: this.onSelectStart.bind(this) },
        'onMouseDown': { eventType: 'mousedown', method: this.onMouseDown.bind(this) },
        'onMouseUp': { eventType: 'mouseup', method: this.onMouseUp.bind(this) },
        'onMouseMove': { eventType: 'mousemove', method: this.onMouseMove.bind(this) },
        'selectedNotesKeydownListener': { eventType: 'keydown', method: this.selectedNotesKeydownListener.bind(this) },

    };
    initSelectionHighlighterEl() {
        this.selectionEl = document.createElement('div');
        this.selectionEl.style.position = 'absolute';
        this.selectionEl.id = SelectionListener.HIGHLIGH_ELEMENT_ID
        this.selectionEl.style.backgroundColor = 'rgba(0,0,255,0.05)';
        this.selectionEl.classList.add('selection-highlighter')
        document.body.append(this.selectionEl);
    }
    getSelectionEl(): HTMLElement {
        return this.selectionEl || document.querySelector('#' + SelectionListener.HIGHLIGH_ELEMENT_ID)!
    }
    cancelSelection() {

        const el = this.getSelectionEl();
        el.remove();
        this.getRetabDoc().getAllNotes().map(n => n.updateSelectionMode(false))
        this.selectedNotes = [];
        this.removeSelectedNotesListeners();
    }
    getRetabDoc(): RezTabFile {
        return store.state.currentDoc
    }
    setSelectionHighlighterXYs() {
        if (!this.startPos || !this.endPos) return;
        this.selectionHighlighterXYs = [
            Math.min(this.startPos[0], this.endPos[0]),
            Math.min(this.startPos[1], this.endPos[1]),
            Math.max(this.startPos[0], this.endPos[0]),
            Math.max(this.startPos[1], this.endPos[1]),
        ]
        temp.value = this.selectionHighlighterXYs
    }
    drawRect() {
        this.setSelectionHighlighterXYs();
        const minX = this.selectionHighlighterXYs[0]
        const maxX = this.selectionHighlighterXYs[2]
        const minY = this.selectionHighlighterXYs[1]
        const maxY = this.selectionHighlighterXYs[3]

        const el = this.getSelectionEl();
        el.style.top = `${minY}px`;
        el.style.bottom = `${maxY}px`;
        el.style.left = `${minX}px`;
        el.style.width = `${maxX - minX}px`
        el.style.height = `${maxY - minY}px`

    }
    setListeners() {
        this.boundMethodNames.initialListeners.forEach((listenerName) => {
            const listener = this.boundMethods[listenerName as keyof typeof this.boundMethods]
            document.addEventListener(listener.eventType, listener.method)
        })

        // document.addEventListener('keydown', this.onCtrl.bind(this))
        // document.addEventListener('keydown', this.onShiftkeyDown.bind(this))
        // document.addEventListener('keyup', this.onShiftkeyUp.bind(this))
        // document.addEventListener('selectstart', this.onSelectStart.bind(this))
        // document.addEventListener('mousedown', this.onMouseDown.bind(this))
        // document.addEventListener('mouseup', this.onMouseUp.bind(this))
        // document.addEventListener('mousemove', this.onMouseMove.bind(this))
    }
    removeListeners() {
        this.boundMethodNames.initialListeners.forEach((listenerName) => {
            const listener = this.boundMethods[listenerName as keyof typeof this.boundMethods]
            document.removeEventListener(listener.eventType, listener.method)
        })

        // document.removeEventListener('keydown', this.onShiftkeyDown)
        // document.removeEventListener('keyup', this.onShiftkeyUp)
        // document.removeEventListener('selectstart', this.onSelectStart)
        // document.removeEventListener('mousedown', this.onMouseDown)
        // document.removeEventListener('mouseup', this.onMouseUp)
        // document.removeEventListener('mousemove', this.onMouseMove)
    }

    setSelectedNotesListeners() {
        const listener = this.boundMethods.selectedNotesKeydownListener
        document.addEventListener(listener.eventType, listener.method)
    }

    removeSelectedNotesListeners() {
        const listener = this.boundMethods.selectedNotesKeydownListener
        document.removeEventListener(listener.eventType, listener.method)
    }
    selectedNotesKeydownListener(event: KeyboardEvent) {
        event.preventDefault();
        const shift = event.shiftKey;
        const ctrl = event.ctrlKey;
        if (event.key == 'Delete') {
            this.deleteSelectedNotes(shift);

        } else if (event.code == 'KeyD') {
            const firstTgCurrentMode = this.selectedNotes[0]?.tabGroup.showTabDurSym
            this.selectedNotes.forEach(n => n.tabGroup.showTabDurSym = !firstTgCurrentMode)
        }
    }

    /**for Selected Notes */
    deleteSelectedNotes(deleteTabgroups = false) {
        if (!deleteTabgroups) {
            this.selectedNotes.forEach(n => { n.tabGroup.updateSelectionMode(false); n.softDelete();})
            this.cancelSelection()
        }
        else this.selectedNotes.forEach(n => n.tabGroup?.remove());
            this.selectedNotes= []
        return
    }



    checkTabgroupsInTheArea() {

        const notes = this.getRetabDoc().getAllNotes();
        notes.forEach(n => {
            const isAlreadyHighlighted = this.selectedNotes.indexOf(n) > -1;
            const isHighlighted = n.isThere() && n.isInSelectionHighliterRange(this.selectionHighlighterXYs);
            if (isHighlighted) {
                if (!isAlreadyHighlighted) this.selectNote(n)
            } else {
                if (!isAlreadyHighlighted) this.deselectNote(n)
            }
            n.updateSelectionMode(isHighlighted || isAlreadyHighlighted)
        })
        // notes[0].isInSelectionHighliterRange(this.selectionHighlighterXYs)

    }
    deselectNote(n: Note) {
        const selectedIndex = this.selectedNotes.indexOf(n);
        if (selectedIndex > -1) {
            this.selectedNotes.splice(this.selectedNotes.indexOf(n), 1)
        }
    }
    selectNote(n: Note) {
        const selectedIndex = this.selectedNotesDuringCurrentDrag.indexOf(n);
        if (selectedIndex == -1) {
            this.selectedNotesDuringCurrentDrag.push(n)
        }
    }
    onShiftkeyDown(event: KeyboardEvent) {
        if (event.key == 'Shift') this.shiftIsDown = true;
    }
    onShiftkeyUp(event: KeyboardEvent) {
        if (event.key == 'Shift') this.shiftIsDown = false;
    }
    onSelectStart(event: Event) {
        if (!this.shiftIsDown) return;
        event.preventDefault();
        // 
    }
    startSelection() {
        this.isSelecting = true;
        this.initSelectionHighlighterEl();

    }
    resumeSelecttion() {
        this.isSelecting = true
        this.initSelectionHighlighterEl();
    }
    endSelection() {
        this.isSelecting = false;
        this.selectedNotes = [...this.selectedNotes, ...this.selectedNotesDuringCurrentDrag.splice(0)];
        this.sortSelectedNotes()
        this.selectionEl?.remove()
        this.setSelectedNotesListeners()

    }
    onMouseDown(e: MouseEvent) {
        if (this.shiftIsDown) {
            if (this.selectedNotes.length) {
                this.startPos = [e.pageX, e.pageY];
                this.resumeSelecttion();
            } else if (!this.isSelecting) {
                this.startPos = [e.pageX, e.pageY];
                this.startSelection()
            } else {
                this.cancelSelection()
            }
        } else {
            this.cancelSelection();
            if (!this.isSelecting) {
                this.cancelSelection();
            }
        }
    }
    onMouseMove(e: MouseEvent) {
        if (this.isSelecting) {
            this.endPos = [e.pageX, e.pageY]
            this.drawRect()
            this.checkTabgroupsInTheArea()
        }
    }
    onMouseUp(e: MouseEvent) {
        if (this.isSelecting) {
            this.endSelection();

        }
    }
    copyNotes() {
        this.clipboard = [...this.selectedNotes.splice(0)];
    }
    pasteTabgroups() {
        let anchorNote = this.getAnchorNote();

        const cb = [...this.clipboard];
        const tabGroups = cb.map(n => n.tabGroup).filter((i, idx, arr) => arr.indexOf(i) == idx);

        while(tabGroups.length) {
            const tg = tabGroups.shift();

            // const newTg = anchorNote?.tabGroup.insertTabgroupAfter();
            const newTg = tg?.clone();
            anchorNote?.tabGroup.insertTabgroupAfter(newTg)
            // tg?.notes.filter(n => n.isThere()).forEach(n => newTg?.addNote({course: n.course, fret: n.fret}))
            anchorNote = newTg?.notes.find(n => n.isThere())
        }
        this.getRetabDoc().setupNotesEls()

    }
    pasteNotes() {
        let anchorNote = this.getAnchorNote();
        const cb = [...this.clipboard]
        let dif: number | undefined = undefined;
        while (cb.length) {

            const noteToPaste = cb.shift();
            if (!anchorNote) break;
            anchorNote.fret = noteToPaste?.fret;
            dif = dif || ((anchorNote.course || 0) - (noteToPaste?.course || 0))
            anchorNote = (anchorNote.tabGroup.getNeighbour(1) || anchorNote.tabGroup.insertTabgroupAfter()).getNoteOnCourse((noteToPaste?.course || 0) + dif)

        }
        return
    }
    sortSelectedNotes() {
        this.selectedNotes = this.selectedNotes.sort((prev, next) => {
            return prev.tabGroup.getIndexInPiece() - next.tabGroup.getIndexInPiece();
        })
    }
    onCtrlC() {
        this.copyNotes()


    }

    onCtrlV() {
        // this.pasteNotes();
        this.pasteTabgroups();
    }

    getAnchorNote() {

        return this.getRetabDoc().getFocusedNote();
    }

    onCtrl(event: KeyboardEvent) {
        const isInTheRetabDocContainer = () => {
            // const i = event.composedPath().indexOf(retabDocContainer.value!); return i > -1
            return !store.state.ui.showPreferencesModal
            }
        if (!isInTheRetabDocContainer()) return;
        if (event.key == 'Control' || !event.ctrlKey) return;
        // firefox keyCode : 67
        if (event.key == 'c' || event.code == 'KeyC' || event.keyCode == 67) {
            event.preventDefault();
            this.onCtrlC()
        }
        // firefox keyCode : 86
        if (event.key == 'v' || event.code == 'KeyV' || event.keyCode == 86) {
            event.preventDefault();
            this.onCtrlV()
        }
    }


}
function initNewDocStuff() {
    const doc = (store.state.currentDoc) as RezTabFile
    store.state.ui.showPreferencesModal = true
    TabGroup.initializeStatics();
}
let { id: docId } = toRefs(props)
async function fetchDoc(id: any) {
    store.state.currentDoc = id == 'new' ? new RezTabFile({
        createdAt: new Date(),
        filename: 'file-one.txt',
        instruments: [Instrumnet.LUTE],
        tabType: TabType.ITALIAN
    }).init() : await RezTabFile.getInstanceFromServer(id);
}
const isLoaded = ref(false);
const sl = ref(new SelectionListener(retabDocContainer.value!));
const temp = ref(sl.value.selectionHighlighterXYs)
onMounted(async () => {
    if(docId.value == 'new') initNewDocStuff()
    await fetchDoc(docId.value);
    isLoaded.value = true;
    sl.value.setListeners();



});
onUnmounted(() => sl.value.removeListeners());


(store.state.currentDoc as RezTabFile).section.addMeasure()
// const props = defineProps<{
//     instance: RezTabFile
// }>() 
async function debugSL() {
    sl.value.removeListeners()

}
</script>