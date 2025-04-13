<template>

    <div>
        <div class="flex justify-between px-16 w-full">
            <va-input v-model="filterStr" label="filter" @update:model-value="getSavedDocsList" inner-label></va-input>
            <div>
                <va-button color="success" @click="newDoc">
                    <va-icon name="add" />
                </va-button>
            </div>
        </div>
        <va-data-table :items="list" :columns="[
            { key: 'title', label: 'Title', },
            { key: 'altTitle', label: 'Alt. Title', },
            { key: 'filename', label: 'Filename', },
            { key: 'createdAt', label: 'Created At', },
            { key: 'lastModifiedAt', label: 'Last Modified At', },
            { key: '', label: 'get Mei', },
            { key: 'edit', label: 'edit', },
            { key: 'remove', label: 'remove', },
        ]" hoverable :clickable="true" striped @row:click="({event, item}) => enterModifyPage(item.id, event)">
            <!-- :filter="filterStr" -->


            <template #cell(edit)="{ rowData }">
                <router-link :to="'/doc/' + rowData.id">
                    <va-icon role="button" name="edit" color="info"></va-icon>
                </router-link>
            </template>
            <template #cell(createdAt)={value} >
                {{ new Date(value).toLocaleString() }}
            </template>
            <template #cell(lastModifiedAt)={value} >
                {{ new Date(value).toLocaleString() }}
            </template>
            <template #cell(remove)="{ rowData }">
                <button @click="remove(rowData.id)">
                    <va-icon role="button" name="delete" color="danger"></va-icon>
                </button>
            </template>

        </va-data-table>
        <div class="flex justify-center py-3 gap-x-3">
            <va-pagination :pages="totalPages" v-model="currentPage" @update:model-value="getSavedDocsList" />


        </div>
    </div>
</template>

<script setup lang="ts">
import RezTabFile from '@/store/modules/RezTabFile';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useModal, useToast } from 'vuestic-ui/web-components';
import { useStore } from 'vuex';

const store = useStore();
const list = ref<any[]>([])
async function getSavedDocsList() {
    const resData = (await axios.get(store.state.apiUrl + '/retab/doc/get-all-saved', {
        params: {
            page: currentPage.value,
            size: perPage.value,
            search: filterStr.value
        }
    })).data
    list.value = resData.docsList
    totalPages.value = resData.totalPages
    console.log(list.value[0])
}

const currentPage = ref(1)
const perPage = ref(20);
const totalPages = ref(20);

const filterStr = ref("")
const modal = useModal();
const toast = useToast();
async function remove(id: number) {
    modal.init({
        message: "Are you sure?",
        okText: 'Yes',
        cancelText: 'No',
        "child:okButton": {
            textColor: 'primary',
        },
        onOk: async () => {
       
            const result = await axios.delete(store.state.apiUrl + '/retab/doc/' + id);
            toast.init({ message: 'Removed successfully.', color: 'success', position: 'bottom-right' });
            await getSavedDocsList()
        }
    })
} 


const router = useRouter();
onMounted(async () => await getSavedDocsList())
function enterModifyPage(id: any, event: Event) {
    if (['I', 'BUTTON'].includes((event.target as HTMLElement).tagName) ) return;
    else router.push('/doc/' + id)
}
function newDoc() {
    router.push('/doc/' + 'new')
}
</script>