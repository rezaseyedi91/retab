<template>
    <div class="md:p-16 flex flex-col  justify-center items-center">

        <va-card class="w-fit">
            <va-card-title>
                Admin Login
            </va-card-title>
            <va-card-content>
                <div >
                    <LoginComp />
                    <va-button @click="adminLogin" class="w-full mt-4" :disabled="reqSent"
                        :loading="reqSent">Login</va-button>
                </div>
            </va-card-content>
        </va-card>
        <hr>
        <va-divider></va-divider>
    </div>
</template>


<script setup lang="ts">
import LoginComp from '@/components/login/LoginComp.vue';
import axios from 'axios';
import {  ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vuestic-ui/web-components';
import { useStore } from 'vuex';
import { type State } from '@/store'


const store = useStore<State>();
const toast = useToast();
const reqSent = ref(false)

const router = useRouter();

async function adminLogin() {
    reqSent.value = true
    const formData = new FormData();


    formData.append('username', store.state.login.username || '');
    formData.append('password', store.state.login.password || '');

    axios.post(store.state.apiUrl + '/retab/auth/admin-login', formData, { withCredentials: true })
        .then(r => {
            reqSent.value = false
            toast.init({
                message: 'Logged in successfully',
                color: 'success',
                position: 'bottom-right'
            })
            store.state.currentUser = r.data;
            router.push({ path: '/admin/dashboard' })
        })
        .catch(err => {
            reqSent.value = false
            toast.init({
                color: 'danger',
                position: 'bottom-right',
                message: err.response?.data
            })
        })


}
</script>


<style soped>
a.page-functionality-switch-button {
    @apply text-primary cursor-pointer hover:underline
}
</style>