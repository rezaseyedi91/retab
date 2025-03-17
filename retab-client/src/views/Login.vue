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
                    <va-input name="email" label="email" type="email" v-model="email"></va-input>
                    <va-input name="password" label="password" type="password" v-model="password"></va-input>
                    <va-button @click="login">Login</va-button>
                </div>
            </va-card-content>
        </va-card>
    </div>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

    const email = ref('')
    const password = ref('')
    const store = useStore();
async function login() {

    const formData = new FormData();


    formData.append('email', email.value);
    formData.append('password', password.value);
    console.log(email.value, password.value)
    const result = await axios.post(store.state.apiUrl + '/login', formData)
}

</script>