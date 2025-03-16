<template>
    <div class="grid gap-3 w-fit py-5 lg:grid-cols-3 " id="header-settings-form" >
        <div class="col ">
            <!-- <label for="">Title</label>
            <input type="text" class="header-input" v-model="title" /> -->
            <va-input color="white" label="Title" type="text" class="header-input" v-model="title" />
        </div>
        <div class="col">
            <!-- <label for="">Composer</label>
            <input type="text" class="header-input" v-model="composer" /> -->
            <va-input color="white" label="Composer" type="text" class="header-input" v-model="composer" />
        </div>
        <div class="col">
            <!-- <label for="">altTitle</label>
            <input type="text" class="header-input" v-model="altTitle" /> -->
            <va-input color="white" label="alt Title" type="text" class="header-input" v-model="altTitle" />
        </div>
        <div class="col">
            <!-- <label for="">description</label>
            <input type="text" class="header-input" v-model="description" /> -->
            <va-input color="white" label="description" type="text" class="header-input" v-model="description" />
        </div>
        <div class="col">
            <!-- <label for="">encoderName</label>
            <input type="text" class="header-input" v-model="encoderName" /> -->
            <va-input color="white" label="encoderName" type="text" class="header-input" v-model="encoderName" />
        </div>
        <div class="col">
            <!-- <label for="">encoderAuth</label>
            <input type="text" class="header-input" v-model="encoderAuth" /> -->
            <va-input color="white" label="encoder Auth" type="text" class="header-input" v-model="encoderAuth" />
        </div>
        <div class="col">
            <!-- <label for="">encoderAuthUri</label>
            <input type="text" class="header-input" v-model="encoderAuthUri" /> -->
            <va-input color="white" label="encoder Auth Uri" type="text" class="header-input" v-model="encoderAuthUri" />
        </div>
        <div class="col">
            <!-- <label for="">biblScopeWorkposition</label>
            <input type="text" class="header-input" v-model="biblScopeWorkposition" /> -->
            <va-input color="white" label="bibl Scope Workposition" type="text" class="header-input" v-model="biblScopeWorkposition" />
        </div>
        <div class="col">
            <!-- <label for="">locusFolioFrom</label>
            <input type="text" class="header-input" v-model="locusFolioFrom" /> -->
            <va-input color="white" label="locus Folio From" type="text" class="header-input" v-model="locusFolioFrom" />
        </div>
        <div class="col">
            <!-- <label for="">locusFolioTo</label>
            <input type="text" class="header-input" v-model="locusFolioTo" /> -->
            <va-input color="white" label="locus Folio To" type="text" class="header-input" v-model="locusFolioTo" />
        </div>
        <div class="col">
            <!-- <label for="">locusFolioContent</label>
            <input type="text" class="header-input" v-model="locusFolioContent" /> -->
            <va-input color="white" label="locus Folio Content" type="text" class="header-input" v-model="locusFolioContent" />
        </div>
        <div class="col">
            <!-- <label for="">termGenre</label>
            <input type="text" class="header-input" v-model="termGenre" /> -->
            <va-input color="white" label="term Genre" type="text" class="header-input" v-model="termGenre" />
        </div>

        <div class="col">
            <!-- notes -->
            <!-- <button class="button" @click="test">log</button>
            <ul class="grid gap-y-3">
                <li v-for="(annot, index) in (doc.head?.__('workList')?.getChildrenByTagName('work')?.map(w => w.__('notesStmt')?.getChildrenByTagName('annot')).reduce((sf, c) => [...sf, ...c] ,[]))" :key="index">
                    <input type="text" v-model="annot.textContent" class="header-input"> 
                    <button class="button" @click="doc.head?.removeAnnot(index)">-</button>
                    
                    
                </li>
                <li>
                    <button class="button" @click="doc.head?.addAnnot()" >Add {{`<annot/>`}}</button>

                </li>
            </ul> -->

        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import RezTabFile from '@/store/modules/RezTabFile';
import { ref, shallowRef, watch } from 'vue';
import MeiAttribute from '@/store/modules/mei-modules/MeiAttribute';
const store = useStore();
const doc = store.state.currentDoc as RezTabFile;

/**
 mainTitle
 alternativeTitle

 */
const title = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=main]').textContent);
const composer = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('composer').__('persName').textContent)


const altTitle = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=Alternative]').textContent);
const description = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=desc]').textContent);
const encoderName = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').textContent)
const encoderAuth = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').getAttribute('xml:id')?.value)
const encoderAuthUri = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').getAttribute('auth.uri')?.value)
const biblScopeWorkposition = shallowRef(doc.head?.__('fileDesc')?.__('sourceDesc').__('source').__('bibl').__('biblScope').__('num[label=workposition]').textContent)
const locusFolioFrom = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]').getAttribute('from')?.value);
const locusFolioTo = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]').getAttribute('to')?.value);
const locusFolioContent = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]')?.textContent);
const termGenre = shallowRef(doc.head?.__('workList').__('work').__('classification').__('termList').__('term[label=genre]').textContent)




watch(title, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('title')?.setTextContent(val)
    doc.head?.__('workList')?.getChildrenByTagName('work')?.[0]?.__('title')?.setTextContent(val)
    doc.head?.__('fileDesc')?.__('sourceDesc').__('source').__('bibl').__('title[type=alternative]').setTextContent(val)

})
watch(composer, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('composer')?.__('persName').setTextContent(val)
    doc.head?.__('workList')?.getChildrenByTagName('work')?.[0]?.__('composer')?.__('persName').setTextContent(val)
})

watch(altTitle, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=Alternative]').setTextContent(val));
watch(description, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=desc]').setTextContent(val));
watch(encoderName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setTextContent(val))
watch(encoderAuth, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setAttribute(new MeiAttribute('xml:id', val + '')))
watch(encoderAuthUri, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setAttribute(new MeiAttribute('auth.uri', val + '')))
watch(biblScopeWorkposition, val => doc.head?.__('fileDesc')?.__('sourceDesc').__('source').__('bibl').__('biblScope').__('num[label=workposition]').setTextContent(val))
watch(locusFolioFrom, val => doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]').setAttribute(new MeiAttribute('from', val + '')))
watch(locusFolioTo, val => doc.head?.__('fileDesc').__('sourceDesc')?.__('source')?.__('bibl')?.__('locus[label=folio]').setAttribute(new MeiAttribute('to', val + '')))
watch(locusFolioContent, val => doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]')?.setTextContent(val));
watch(termGenre, val => doc.head?.__('workList').__('work').__('classification').__('termList').__('term[label=genre]').setTextContent(val))
function test() {
    const result = doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=main]')

}
</script>