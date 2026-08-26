<template>
    <div class="grid gap-4 justify-center">

        <va-input name="name" label="name" type="name" v-model="store.state.login.name" />
        <va-input name="email" label="email" type="email" v-model="store.state.login.email" />
        <VaInput v-model="store.state.login.password" :type="store.state.login.isPasswordVisible ? 'text' : 'password'"
            label="Password"
            @click-append-inner="store.state.login.isPasswordVisible = !store.state.login.isPasswordVisible">
            <template #appendInner>
                <VaIcon :name="store.state.login.isPasswordVisible ? 'visibility_off' : 'visibility'" size="small"
                    color="primary" />
            </template>
        </VaInput>


        <VaInput v-model="store.state.login.repeatPassword"
            :type="store.state.login.isRepeatPasswordVisible ? 'text' : 'password'" label="Repeat Password"
            name="repeat-password" immediate-validation
            :rules="[v => (v == store.state.login.password) || 'Not exactly like the password, yet.']"
            @click-append-inner="store.state.login.isRepeatPasswordVisible = !store.state.login.isRepeatPasswordVisible">
            <template #appendInner>
                <VaIcon :name="store.state.login.isRepeatPasswordVisible ? 'visibility_off' : 'visibility'" size="small"
                    color="primary" />
            </template>
        </VaInput>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { type State } from '@/store'
const store = useStore<State>();
</script>