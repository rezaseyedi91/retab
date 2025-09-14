<template>
    <div id="header-settings-form">
        <div class="">
            <div>
                <ChoosePrevious />
            </div>
            <va-card color="transparent" class="my-2" v-for="(inputGroup, index) in inputGroups" :key="index">
                <va-card-title>{{ inputGroup.title }}</va-card-title>
                <va-card-content class="grid gap-3 w-fit py-5 lg:grid-cols-3 ">
                    <va-input color="white" v-for="input in inputGroup.inputs" :key="input.label" :label="input.label"
                        type="text" class="header-input" v-model="input.vModel.value" />
                </va-card-content>
            </va-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import RezTabFile from '@/store/modules/RezTabFile';
import { onUnmounted, ref, shallowRef, watch } from 'vue';
import MeiAttribute from '@/store/modules/mei-modules/MeiAttribute';
import ChoosePrevious from './ChoosePrevious.vue';
const store = useStore();
const doc = store.state.currentDoc as RezTabFile;




const title = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('title[type=main]')?.textContent);
const composer = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('composer')?.__add('persName')?.textContent)

const altTitle = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('title[type=Alternative]')?.textContent);
const subtitle = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('title[type=subtitle]')?.textContent);


const description = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('title[type=desc]')?.textContent);
const encoderName = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('persName')?.textContent)
const encoderAuth = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('persName').getAttribute('auth')?.value)
const encoderAuthUri = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('persName').getAttribute('auth.uri')?.value)
const encoderXmlId = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('persName').getAttribute('xml:id')?.value)


const biblScopeWorkposition = shallowRef(doc.head?.__add('fileDesc')?.__add('sourceDesc')?.__add('source')?.__add('bibl')?.__add('biblScope')?.__add('num[label=workposition]')?.textContent)
const locusFolioFrom = shallowRef(doc.head?.__add('fileDesc')?.__add('sourceDesc')?.__add('source')?.__add('bibl')?.__add('locus[label=folio]').getAttribute('from')?.value);
const locusFolioTo = shallowRef(doc.head?.__add('fileDesc')?.__add('sourceDesc')?.__add('source')?.__add('bibl')?.__add('locus[label=folio]').getAttribute('to')?.value);
const locusFolioContent = shallowRef(doc.head?.__add('fileDesc')?.__add('sourceDesc')?.__add('source')?.__add('bibl')?.__add('locus[label=folio]')?.textContent);

const termGenre = shallowRef(doc.head?.__add('workList')?.__add('work')?.__add('classification')?.__add('termList')?.__add('term[label=genre]')?.textContent)

//Corporation Information:
const corpOneName = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('name')?.textContent)
const corpTwoName = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('corpName')?.__add('name')?.textContent)
//address
const street = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('corpName')?.__add('address')?.__add('street')?.textContent)
const postBox = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('corpName')?.__add('address')?.__add('postBox')?.textContent)
const postCode = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('corpName')?.__add('address')?.__add('postCode')?.textContent)
const settlement = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('corpName')?.__add('address')?.__add('settlement')?.textContent)
const country = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('respStmt')?.__add('corpName')?.__add('corpName')?.__add('address')?.__add('country')?.textContent)

//Funder
const funderCorpOneName = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('funder')?.__add('corpName')?.textContent)
const funcderCorpTwoName = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('funder')?.__add('corpName[auth]')?.textContent)
const funcderCorpTwoAuth = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('funder')?.__add('corpName[auth]').getAttribute('auth')?.value)
const funcderCorpTwoUri = shallowRef(doc.head?.__add('fileDesc')?.__add('titleStmt')?.__add('funder')?.__add('corpName[auth.uri]').getAttribute('auth.uri')?.value)


//Pub
const pubAvailability = shallowRef(doc.head?.__add('fileDesc')?.__add('pubStmt')?.__add('availability')?.textContent)
const physLocRepoCorpName = shallowRef(doc.head?.__add('fileDesc')?.__add('sourceDesc')?.__add('source')?.__add('bibl')?.__add('physLoc')?.__add('repository')?.__add('corpName')?.textContent)


// encodingDesc:
const projectDescHead = shallowRef(doc.head?.__add('encodingDesc')?.__add('projectDesc')?.__add('head')?.textContent)
const projectDescP = shallowRef(doc.head?.__add('encodingDesc')?.__add('projectDesc')?.__add('p')?.textContent)

// workCreationInfo:
const workCreationDateFrom = shallowRef(doc.head?.__add('workList')?.__add('work')?.__add('creation')?.__add('date').getAttribute('notbefore')?.value)
const workCreationDateTo = shallowRef(doc.head?.__add('workList')?.__add('work')?.__add('creation')?.__add('date').getAttribute('notafter')?.value)
const workCreationDateSpan = shallowRef(doc.head?.__add('workList')?.__add('work')?.__add('creation')?.__add('date')?.textContent) //workCreationDateFrom.value + '-' + workCreationDateTo.value
const workCreationSettlement = shallowRef(doc.head?.__add('workList')?.__add('work')?.__add('creation')?.__add('settlement')?.textContent)
const workCreationCountry = shallowRef(doc.head?.__add('workList')?.__add('work')?.__add('creation')?.__add('country')?.textContent)
// const inputGroups: any[] = []//
const inputGroups = [
    {
        title: 'Piece Information',
        inputs: [
            { label: "Title", vModel: title },
            { label: "Composer", vModel: composer },
            { label: "alt Title", vModel: altTitle },
            { label: "description", vModel: description },
            { label: "subtitle", vModel: subtitle },

        ]

    },
    {
        title: 'Encoder',
        inputs: [
            { label: "encoder Name", vModel: encoderName },
            { label: "encoder Auth", vModel: encoderAuth },
            { label: "encoder Auth Uri", vModel: encoderAuthUri },
            { label: "encoder Xml Id", vModel: encoderXmlId },
            { label: "bibl Scope Workposition", vModel: biblScopeWorkposition },
            { label: "locus Folio From", vModel: locusFolioFrom },
            { label: "locus Folio To", vModel: locusFolioTo },
            { label: "locus Folio Content", vModel: locusFolioContent },
            { label: "term Genre", vModel: termGenre },
            { label: "project DescHead", vModel: projectDescHead },
            { label: "project Desc P", vModel: projectDescP },

        ]
    }, {
        title: 'Encoder Corporation Name and Address',
        inputs: [
            { label: "corp One Name", vModel: corpOneName },
            { label: "corp Two Name", vModel: corpTwoName },
            { label: "street", vModel: street },
            { label: "post Box", vModel: postBox },
            { label: "post Code", vModel: postCode },
            { label: "settlement", vModel: settlement },
            { label: "country", vModel: country },
        ]
    }, {
        title: 'Funder',
        inputs: [
            { label: "funder Corp One Name", vModel: funderCorpOneName },
            { label: "funcder Corp Two Name", vModel: funcderCorpTwoName },
            { label: "funcder Corp Two Auth", vModel: funcderCorpTwoAuth },
            { label: "funcder Corp Two Uri", vModel: funcderCorpTwoUri },
        ]

    }, {
        title: 'work Creation Information',
        inputs: [
            { label: "work Creation Date From", vModel: workCreationDateFrom },
            { label: "work Creation Date To", vModel: workCreationDateTo },
            { label: "work Creation Date Span", vModel: workCreationDateSpan },
            { label: "work Creation Settlement", vModel: workCreationSettlement },
            { label: "work Creation Country", vModel: workCreationCountry },

        ]
    }, {
        title: 'Publication Information',
        inputs: [
            { label: "pub Availability", vModel: pubAvailability },
            { label: "phys Loc Repo CorpName", vModel: physLocRepoCorpName },

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
    doc.head?.__('fileDesc')?.__('sourceDesc')?.__('source')?.__('bibl')?.__('title[type=alternative]').setTextContent(val)

})
watch(composer, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('composer')?.__('persName').setTextContent(val)
    doc.head?.__('workList')?.getChildrenByTagName('work')?.[0]?.__('composer')?.__('persName').setTextContent(val)
})

watch(altTitle, val => {
    doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=Alternative]').setTextContent(val)
    doc.info.altTitle = val
});
watch(description, val => { doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=desc]').setTextContent(val) });
watch(encoderName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('persName').setTextContent(val))
watch(encoderAuth, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('persName').setAttribute(new MeiAttribute('auth', val + '')))
watch(encoderAuthUri, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('persName').setAttribute(new MeiAttribute('auth.uri', val + '')))
watch(biblScopeWorkposition, val => doc.head?.__('fileDesc')?.__('sourceDesc')?.__('source')?.__('bibl')?.__('biblScope')?.__('num[label=workposition]').setTextContent(val))
watch(locusFolioFrom, val => doc.head?.__('fileDesc')?.__('sourceDesc')?.__('source')?.__('bibl')?.__('locus[label=folio]').setAttribute(new MeiAttribute('from', val + '')))
watch(locusFolioTo, val => doc.head?.__('fileDesc')?.__('sourceDesc')?.__('source')?.__('bibl')?.__('locus[label=folio]').setAttribute(new MeiAttribute('to', val + '')))
watch(locusFolioContent, val => doc.head?.__('fileDesc')?.__('sourceDesc')?.__('source')?.__('bibl')?.__('locus[label=folio]')?.setTextContent(val));
watch(termGenre, val => doc.head?.__('workList')?.__('work')?.__('classification')?.__('termList')?.__('term[label=genre]').setTextContent(val))

watch(subtitle, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('title[type=subtitle]').setTextContent(val));
watch(encoderXmlId, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('persName').setAttribute(new MeiAttribute('xml:id', val!)))
watch(corpOneName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('name').setTextContent(val))
watch(corpTwoName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('corpName')?.__('name').setTextContent(val))
watch(street, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('corpName')?.__('address')?.__('street').setTextContent(val))
watch(postBox, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('corpName')?.__('address')?.__('postBox').setTextContent(val))
watch(postCode, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('corpName')?.__('address')?.__('postCode').setTextContent(val))
watch(settlement, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('corpName')?.__('address')?.__('settlement').setTextContent(val))
watch(country, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('respStmt')?.__('corpName')?.__('corpName')?.__('address')?.__('country').setTextContent(val))
watch(funderCorpOneName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('funder')?.__('corpName').setTextContent(val))
watch(funcderCorpTwoName, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('funder')?.__('corpName[auth]').setTextContent(val))
watch(funcderCorpTwoAuth, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('funder')?.__('corpName[auth]').setAttribute(new MeiAttribute('auth', val!)))
watch(funcderCorpTwoUri, val => doc.head?.__('fileDesc')?.__('titleStmt')?.__('funder')?.__('corpName[auth.uri]').setAttribute(new MeiAttribute('auth.uri', val!)))
watch(pubAvailability, val => doc.head?.__('fileDesc')?.__('pubStmt')?.__('availability').setTextContent(val))
watch(physLocRepoCorpName, val => doc.head?.__('fileDesc')?.__('sourceDesc')?.__('source')?.__('bibl')?.__('physLoc')?.__('repository')?.__('corpName').setTextContent(val))
watch(projectDescHead, val => doc.head?.__('encodingDesc')?.__('projectDesc')?.__('head').setTextContent(val))
watch(projectDescP, val => doc.head?.__('encodingDesc')?.__('projectDesc')?.__('p').setTextContent(val))
watch(workCreationDateFrom, val => {
    doc.head?.__('workList')?.__('work')?.__('creation')?.__('date').setAttribute(new MeiAttribute('notbefore', val!))
    workCreationDateSpan.value = workCreationDateFrom.value + '-' + workCreationDateTo.value
})
watch(workCreationDateTo, val => {
    doc.head?.__('workList')?.__('work')?.__('creation')?.__('date').setAttribute(new MeiAttribute('notafter', val!))
    workCreationDateSpan.value = workCreationDateFrom.value + '-' + workCreationDateTo.value
})
watch(workCreationDateSpan, val => doc.head?.__('workList')?.__('work')?.__('creation')?.__('date').setTextContent(val)) //workCreationDateFrom.value + '-' + workCreationDateTo.value
watch(workCreationSettlement, val => doc.head?.__('workList')?.__('work')?.__('creation')?.__('settlement').setTextContent(val))
watch(workCreationCountry, val => doc.head?.__('workList')?.__('work')?.__('creation')?.__('country').setTextContent(val))


onUnmounted(() => {
    console.log(inputGroups.map(g => {
        return g.inputs.map(i => i.vModel)
    }))
})
</script>