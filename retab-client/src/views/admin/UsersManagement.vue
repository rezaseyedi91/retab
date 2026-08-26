<template>
    <admin-panel-layout>

        <div>
            <va-data-table :items="usersList" :columns="[
                { key: 'id', name: 'id', },
                { key: 'name', name: 'name', },
                { key: 'email' },
                { key: 'actions' },
                { key: 'joinedAt', displayFormatFn(d) { return new Date(d).toLocaleDateString() }, name: 'since' },
                { key: '_count.docs', displayFormatFn(d) { return d }, thTitle: 'Docs Count', label: 'Docs Count' }
            ]" :current-page="page" :per-page="perPage" :select-mode="'multiple'" v-model="selectedUsers" hoverable>
                <template #cell(actions)="{ rowData }">
                    <va-popover :message="'reset password'" color="info" class="text-sm">
                        <va-icon name="key" size="large" color="info" focusable
                            @click="resetPassword(rowData.id, rowData.email!)" />
                    </va-popover>
                    <va-popover :message="'remove user'" color="info" class="text-sm">
                        <va-icon name="delete_forever" size="large" color="danger" focusable
                            @click="removeUser(rowData.id, rowData.email!)" />
                    </va-popover>
                </template>
            </va-data-table>
            <div class="flex justify-center">
                <va-pagination v-model="page" :total="usersList.length" :pages="usersList.length / perPage" />
            </div>
        </div>
    </admin-panel-layout>
</template>

<script setup lang="ts">
import AdminPanelLayout from '@/components/AdminPanelLayout.vue';
import type { TUser } from '@/store/modules/db-types';
import axios, { AxiosError } from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { State } from '@/store';
import { useRouter } from 'vue-router';
import { useModal, useToast } from 'vuestic-ui/web-components';

const router = useRouter();
const page = ref(Number(router.currentRoute.value.query.page || 1));
const perPage = ref(10)
const modal = useModal();
const toast = useToast();
const usersList = ref<TUser[]>([]);
const store = useStore<State>();
async function updateUsersList() {
    usersList.value = (await axios.get(store.state.apiUrl + '/retab/admin/get-users-list', { withCredentials: true, })).data || []
}
onMounted(async () => {
    
    //params: {  page: page.value, take: perPage.value}
    await updateUsersList()
    

})

function askIfSure(message: string) {
    return new Promise<boolean>(resolve => {


        modal.init({
            onOk: async () => {
                return resolve(true)
            },
            "child:okButton": {
                color: 'danger',
                backgroundOpacity: 1,
                textColor: 'danger',
                hoverBehavior: 'opacity'
            },
            onCancel: () => { return resolve(false) },
            message,
            "okText": 'Yes I\'m sure',
            cancelText: 'No. Nevermind'
        })
    })

}
async function resetPassword(id?: number, email?: string) {
    if (!id) throw new Error('ID must be provided');
    const sure = await askIfSure('Are you sure you want to reset the user\'s password?');
    if (!sure) return;
    try {

        const result = await axios.put(store.state.apiUrl + '/retab/admin/reset-password', { withCredentials: true, data: { id } })

        toast.init({
            position: 'bottom-center',
            color: 'success',
            message: `Password reset successfully.<br>  for email ${email} <br> new password:  <b>${result.data.newPassword}</b> `,
            iconClass: 'content_copy',
            duration: 5000,
            dangerouslyUseHtmlString: true,
            customClass: 'cursor-pointer',
            closeable: true,
            onClick: () => {
                navigator.clipboard.writeText(result.data.newPassword);
                toast.init({ message: 'Copied!', position: 'top-center', color: 'info', duration: 1000 })
            },

        })

    } catch (err: any) {
        toast.init({
            message: (err as AxiosError).message,
            color: 'danger',
            position: 'bottom-right',

        })
    }
}

async function removeUser(id?: number, email?: string) {
    if (!id) throw new Error('ID must be provided');
    const sure = await askIfSure('Are you sure you want to Remove user?');
    if (!sure) return;
    try {

        const result = await axios.delete(store.state.apiUrl + '/retab/admin/remove-user', { withCredentials: true, data: { id } })
        
        await updateUsersList();
        toast.init({
            position: 'bottom-center',
            color: 'success',
            dangerouslyUseHtmlString: true,
            message: `User <strong>${email}</strong> <br> has been removed successfully`,
            iconClass: 'content_copy',
            duration: 5000,
            customClass: 'cursor-pointer',
            closeable: true,
        })
    } catch (err: any) {
        toast.init({
            message: (err as AxiosError).message,
            color: 'danger',
            position: 'bottom-right',
        })
    }




}

const selectedUsers = ref([])
</script>
