<template>
    <div class="grid gap-4 justify-center">
        <va-input name="username" label="username (Email)" type="username" v-model="store.state.login.username" />
        <VaInput v-model="store.state.login.password" :type="store.state.login.isPasswordVisible ? 'text' : 'password'"
            label="Password"
            @click-append-inner="store.state.login.isPasswordVisible = !store.state.login.isPasswordVisible">
            <template #appendInner>
                <VaIcon :name="store.state.login.isPasswordVisible ? 'visibility_off' : 'visibility'" size="small"
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