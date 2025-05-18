<template>
    <div id="header-settings-form" >
        <div class="">
            <va-card color="transparent" class="my-2"  v-for="(inputGroup, index) in inputGroups" :key="index">
                <va-card-title>{{ inputGroup.title }}</va-card-title>
                <va-card-content class="grid gap-3 w-fit py-5 lg:grid-cols-3 " >
                    <va-input color="white" v-for="input in inputGroup.inputs" :key="input.label"
                    
                    :label="input.label" type="text" class="header-input" v-model="input.vModel.value" />

                </va-card-content>
            </va-card>
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




const title = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=main]').textContent);
const composer = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('composer').__('persName').textContent)

const altTitle = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=Alternative]').textContent);
const subtitle = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=subtitle]').textContent);


const description = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=desc]').textContent);
const encoderName = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').textContent)
const encoderAuth = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').getAttribute('auth')?.value)
const encoderAuthUri = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').getAttribute('auth.uri')?.value)
const encoderXmlId = shallowRef(doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').getAttribute('xml:id')?.value)


const biblScopeWorkposition = shallowRef(doc.head?.__('fileDesc')?.__('sourceDesc').__('source').__('bibl').__('biblScope').__('num[label=workposition]').textContent)
const locusFolioFrom = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]').getAttribute('from')?.value);
const locusFolioTo = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]').getAttribute('to')?.value);
const locusFolioContent = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]')?.textContent);

const termGenre = shallowRef(doc.head?.__('workList').__('work').__('classification').__('termList').__('term[label=genre]').textContent)

//Corporation Information:
const corpOneName = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('name').textContent)
const corpTwoName = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('name').textContent)
//address
const street = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('street').textContent)
const postBox = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('postBox').textContent)
const postCode = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('postCode').textContent)
const settlement = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('settlement').textContent)
const country = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('country').textContent)


//Funder
const funderCorpOneName = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName').textContent)
const funcderCorpTwoName = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName[auth]').textContent)
const funcderCorpTwoAuth = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName[auth]').getAttribute('auth')?.value)
const funcderCorpTwoUri = shallowRef(doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName[auth.uri]').getAttribute('auth.uri')?.value )


//Pub
const pubAvailability = shallowRef(doc.head?.__('fileDesc').__('pubStmt').__('availability').textContent)
const physLocRepoCorpName = shallowRef(doc.head?.__('fileDesc').__('sourceDesc').__('source').__('bibl').__('physLoc').__('repository').__('corpName').textContent)


// encodingDesc:
const projectDescHead = shallowRef(doc.head?.__('encodingDesc').__('projectDesc').__('head').textContent)
const projectDescP = shallowRef(doc.head?.__('encodingDesc').__('projectDesc').__('p').textContent)

// workCreationInfo:
const workCreationDateFrom =  shallowRef(doc.head?.__('workList').__('work').__('creation').__('date').getAttribute('notbefore')?.value)
const workCreationDateTo =     shallowRef(doc.head?.__('workList').__('work').__('creation').__('date').getAttribute('notafter')?.value)
const workCreationDateSpan =     shallowRef(doc.head?.__('workList').__('work').__('creation').__('date').textContent) //workCreationDateFrom.value + '-' + workCreationDateTo.value
const workCreationSettlement = shallowRef(doc.head?.__('workList').__('work').__('creation').__('settlement').textContent)
const workCreationCountry = shallowRef(doc.head?.__('workList').__('work').__('creation').__('country').textContent)
// const inputGroups: any[] = []//
 const inputGroups = [
    {
        title: 'Piece Information',
        inputs: [
            {label: "Title", vModel: title},
            {label: "Composer", vModel: composer},
            {label: "alt Title", vModel: altTitle},
            {label: "description", vModel: description},
            {label: "subtitle", vModel: subtitle},
            
        ]
        
    }, 
    {
        title: 'Encoder',
        inputs: [
            {label: "encoderName", vModel: encoderName},
            {label: "encoder Auth", vModel: encoderAuth},
            {label: "encoder Auth Uri", vModel: encoderAuthUri},
            {label: "encoder Xml Id", vModel: encoderXmlId},
            {label: "bibl Scope Workposition", vModel: biblScopeWorkposition},
            {label: "locus Folio From", vModel: locusFolioFrom},
            {label: "locus Folio To", vModel: locusFolioTo},
            {label: "locus Folio Content", vModel: locusFolioContent},
            {label: "term Genre", vModel: termGenre},
            {label: "projectDescHead", vModel: projectDescHead},
            {label: "projectDescP", vModel: projectDescP},
            
        ]
    }, {
        title: 'Encoder Corporation Name and Address',
        inputs: [
            {label: "corpOneName", vModel: corpOneName},
            {label: "corpTwoName", vModel: corpTwoName},
            {label: "street", vModel: street},
            {label: "postBox", vModel: postBox},
            {label: "postCode", vModel: postCode},
            {label: "settlement", vModel: settlement},
            {label: "country", vModel: country},
        ]
    }, {
        title: 'Funder',
        inputs: [
            {label: "funderCorpOneName", vModel: funderCorpOneName},
            {label: "funcderCorpTwoName", vModel: funcderCorpTwoName},
            {label: "funcderCorpTwoAuth", vModel: funcderCorpTwoAuth},
            {label: "funcderCorpTwoUri", vModel: funcderCorpTwoUri},
        ]
        
    }, {
        title: 'work Creation Information',
        inputs: [
            {label: "workCreationDateFrom", vModel: workCreationDateFrom},
            {label: "workCreationDateTo", vModel: workCreationDateTo},
            {label: "workCreationDateSpan", vModel: workCreationDateSpan},
            {label: "workCreationSettlement", vModel: workCreationSettlement},
            {label: "workCreationCountry", vModel: workCreationCountry},
            
        ]
    }, {
        title: 'Publication Information', 
        inputs: [
            {label: "pubAvailability", vModel: pubAvailability},
            {label: "physLocRepoCorpName", vModel: physLocRepoCorpName},

        ]
    }

    /**
     //Corporation Information:








Funder




Pub




workCreationInfo





     */


]

watch(title, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('title')?.setTextContent(val)
    doc.head?.__('workList')?.getChildrenByTagName('work')?.[0]?.__('title')?.setTextContent(val)
    doc.head?.__('fileDesc')?.__('sourceDesc').__('source').__('bibl').__('title[type=alternative]').setTextContent(val)

})
watch(composer, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('composer')?.__('persName').setTextContent(val)
    doc.head?.__('workList')?.getChildrenByTagName('work')?.[0]?.__('composer')?.__('persName').setTextContent(val)
})

watch(altTitle, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=Alternative]').setTextContent(val)
    doc.info.altTitle = val
});
watch(description, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=desc]').setTextContent(val));
watch(encoderName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setTextContent(val))
watch(encoderAuth, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setAttribute(new MeiAttribute('auth', val + '')))
watch(encoderAuthUri, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setAttribute(new MeiAttribute('auth.uri', val + '')))
watch(biblScopeWorkposition, val => doc.head?.__('fileDesc')?.__('sourceDesc').__('source').__('bibl').__('biblScope').__('num[label=workposition]').setTextContent(val))
watch(locusFolioFrom, val => doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]').setAttribute(new MeiAttribute('from', val + '')))
watch(locusFolioTo, val => doc.head?.__('fileDesc').__('sourceDesc')?.__('source')?.__('bibl')?.__('locus[label=folio]').setAttribute(new MeiAttribute('to', val + '')))
watch(locusFolioContent, val => doc.head?.__('fileDesc').__('sourceDesc').__('source')?.__('bibl')?.__('locus[label=folio]')?.setTextContent(val));
watch(termGenre, val => doc.head?.__('workList').__('work').__('classification').__('termList').__('term[label=genre]').setTextContent(val))

watch(subtitle, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=subtitle]').setTextContent(val));
watch(encoderXmlId, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt').__('persName').setAttribute(new MeiAttribute('xml:id', val!)))
watch(corpOneName, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('name').setTextContent(val))
watch(corpTwoName, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('name').setTextContent(val))
watch(street, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('street').setTextContent(val))
watch(postBox, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('postBox').setTextContent(val))
watch(postCode, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('postCode').setTextContent(val))
watch(settlement, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('settlement').setTextContent(val))
watch(country, val => doc.head?.__('fileDesc').__('titleStmt').__('respStmt').__('corpName').__('corpName').__('address').__('country').setTextContent(val))
watch(funderCorpOneName, val => doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName').setTextContent(val))
watch(funcderCorpTwoName, val => doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName[auth]').setTextContent(val))
watch(funcderCorpTwoAuth, val => doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName[auth]').setAttribute(new MeiAttribute('auth', val!)))
watch(funcderCorpTwoUri, val => doc.head?.__('fileDesc').__('titleStmt').__('funder').__('corpName[auth.uri]').setAttribute(new MeiAttribute('auth.uri', val!)))
watch(pubAvailability, val => doc.head?.__('fileDesc').__('pubStmt').__('availability').setTextContent(val))
watch(physLocRepoCorpName, val => doc.head?.__('fileDesc').__('sourceDesc').__('source').__('bibl').__('physLoc').__('repository').__('corpName').setTextContent(val))
watch(projectDescHead, val => doc.head?.__('encodingDesc').__('projectDesc').__('head').setTextContent(val))
watch(projectDescP, val => doc.head?.__('encodingDesc').__('projectDesc').__('p').setTextContent(val))
watch(workCreationDateFrom, val => {
    doc.head?.__('workList').__('work').__('creation').__('date').setAttribute(new MeiAttribute('notbefore', val!))
    workCreationDateSpan.value = workCreationDateFrom.value + '-' + workCreationDateTo.value
})
watch(workCreationDateTo, val => {
    doc.head?.__('workList').__('work').__('creation').__('date').setAttribute(new MeiAttribute('notafter', val!))
    workCreationDateSpan.value = workCreationDateFrom.value + '-' + workCreationDateTo.value
})
watch(workCreationDateSpan, val => doc.head?.__('workList').__('work').__('creation').__('date').setTextContent(val)) //workCreationDateFrom.value + '-' + workCreationDateTo.value
watch(workCreationSettlement, val => doc.head?.__('workList').__('work').__('creation').__('settlement').setTextContent(val))
watch(workCreationCountry, val => doc.head?.__('workList').__('work').__('creation').__('country').setTextContent(val))

</script>