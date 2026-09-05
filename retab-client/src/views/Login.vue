<template>
    <div class="md:p-16 flex flex-col  justify-center items-center">
        <MainLogo class="w-[90vw] mb-10"/>
        <va-card class="w-fit">
            <va-card-title>
                ReTab Login
            </va-card-title>
            <va-card-content>
                <div v-if="pageFunctionality == PageFunctionality.LOGIN">

                    <LoginComp />
                    <va-button @click="login" class="w-full mt-4" :disabled="reqSent"
                        :loading="reqSent">Login</va-button>
                </div>
                <div v-else>

                    <SignupComp />

                    <va-button @click="signup" class="w-full mt-4" :disabled="reqSent" :loading="reqSent">Signup
                    </va-button>
                </div>

                <p class="pt-2 text-sm">
                    <span>
                        {{ pageFunctionalityChangeMessage }}
                    </span>
                    <a class="page-functionality-switch-button"
                        @click="pageFunctionality = pageFunctionality == PageFunctionality.LOGIN ? PageFunctionality.SIGNUP : PageFunctionality.LOGIN">
                        {{ pageFunctionalitySwitchTo }}
                    </a>
                </p>
            </va-card-content>
        </va-card>
        <hr>
        <va-divider></va-divider>

        <va-card color="info">
            <va-card-content>

                Try RéTab https://tab.rezaseyedi.com with a guest account:
                <br>
                <strong>
                    username:
                </strong>
                guest
                <br>
                <strong>
                    password:

                </strong>
                retabguest@123
                <br>
                or you can also sign up if you want to use ReTab with a personal account.
            </va-card-content>
        </va-card>
    </div>
</template>


<script setup lang="ts">
import LoginComp from '@/components/login/LoginComp.vue';
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vuestic-ui/web-components';
import { useStore } from 'vuex';
import { type State } from '@/store'
import SignupComp from '@/components/login/SignupComp.vue';
import MainLogo from '@/components/utils/MainLogo.vue';
enum PageFunctionality {
    LOGIN, SIGNUP
}

const pageFunctionality = ref<PageFunctionality>(PageFunctionality.LOGIN)
const isRepeatPasswordVisible = ref(false)






const store = useStore<State>();
const toast = useToast();
const reqSent = ref(false)

const router = useRouter();


const pageFunctionalityChangeMessage = computed(() => pageFunctionality.value == PageFunctionality.LOGIN ? " Don't have an Account? you can " : " Already have an account? you can ")
const pageFunctionalitySwitchTo = computed(() => pageFunctionality.value == PageFunctionality.LOGIN ? "Signup" : "Login")


async function login() {
    reqSent.value = true
    const formData = new FormData();


    formData.append('username', store.state.login.username || '');
    formData.append('password', store.state.login.password || '');

    axios.post(store.state.apiUrl + '/retab/auth/login', formData, { withCredentials: true })
        .then(r => {
            reqSent.value = false
            toast.init({
                message: 'Logged in successfully',
                color: 'success',
                position: 'bottom-right'
            })
            store.state.currentUser = r.data;
            router.push({ path: '/doc' })
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


async function signup() {
    reqSent.value = true
    const formData = new FormData();


    formData.append('name', store.state.login.name || '');
    formData.append('email', store.state.login.email || '');
    formData.append('password', store.state.login.password || '');
    
    axios.post(store.state.apiUrl + '/retab/auth/signup', formData, { withCredentials: true })
        .then(r => {
            reqSent.value = false
            toast.init({
                message: 'Signed up successfully',
                color: 'success',
                position: 'bottom-right'
            })
            store.state.currentUser = r.data;
            router.push({ path: '/doc' })
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