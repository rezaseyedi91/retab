<template>
    <div class="md:p-16 flex justify-center items-center">
        <va-card class="w-fit">
            <va-card-header>
                <va-card-title>
                    ReTab Login
                </va-card-title>
            </va-card-header>
            <va-card-content>
                <div class="grid gap-4 justify-center">
                    <va-input name="username" label="username" type="username" v-model="username"></va-input>
                    <VaInput v-model="password" :type="isPasswordVisible ? 'text' : 'password'"
                        label="Password" @click-append-inner="isPasswordVisible = !isPasswordVisible">
                        <template #appendInner>
                            <VaIcon :name="isPasswordVisible ? 'visibility_off' : 'visibility'" size="small"
                                color="primary" />
                        </template>
                    </VaInput>
                    <va-button @click="login">Login</va-button>
                </div>
            </va-card-content>
        </va-card>
    </div>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vuestic-ui/web-components';
import { useStore } from 'vuex';
const isPasswordVisible = ref(false)
const username = ref('')
const password = ref('')
const store = useStore();
const toast = useToast();
const router = useRouter();
async function login() {

    const formData = new FormData();


    formData.append('username', username.value);
    formData.append('password', password.value);
    
    axios.post(store.state.apiUrl + '/retab/auth/login', formData, {withCredentials: true})
    .then(r => {
        toast.init({
            message: 'Logged in successfully',
            color: 'success',
            position: 'bottom-right'
        })

        store.state.currentUser = r.data;
        router.push({path: '/doc'})
    })
    .catch(err => {
        
        toast.init({
            color: 'danger',
            position: 'bottom-right',
            message: err.response?.data
        })
    })


}

</script>