<template>

    <VaModal v-model="store.state.ui.showPreferencesModal" backgroundColor="info"  size="large" cancelText=" " gradient
    fixedLayout
        hideDefaultActions>
        <template #anchor>
            <div class="h-fit">

                <button @click="store.state.ui.showPreferencesModal = true" class="cursor-pointer">
                    <Cog6ToothIcon class="w-8 fill-white" />
                </button>
            </div>
        </template>
        <template #header>
            <strong>
                Document Preferences
            </strong>
        </template>
        <template #default>
            <div class="flex items-start">
                <div class="pt-3 pr-10">
                    <va-tabs vertical  grow v-model="currentTabVModel" color="white">
                        <template #tabs>

                            <va-tab v-for=" tab in tabs " :key="tab.key" color="white" @click="() => currentTab = tab" :name="tab.key">
                                {{ tab.title }}
                                
                            </va-tab>
                        </template>
                    </va-tabs>

                </div>
                <div class="flex items-center justify-center w-full ">
       
                        <Component :is="currentTab.component" />
                </div>
            </div>
        </template>
        <template #footer>
            <va-button @click="store.state.ui.showPreferencesModal = false" color="success">Save</va-button>
        </template>
    </VaModal>



</template>


<script setup lang="ts">
import { Cog6ToothIcon, LockClosedIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import { useStore } from 'vuex';
import { type Component, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import Tuning from './tabs/Tuning/index.vue'
import Header from './tabs/Header/index.vue'
import Advanced from './tabs/Advanced/index.vue'


const tabs: { title: string, component: Component, key: number }[] = [
    { title: 'Tuning', component: Tuning, key: 0 },
    { title: 'Header', component: Header, key: 1 },
    { title: 'Advanced', component: Advanced, key: 2 },

]

const maxHeight = ref('10px')
const currentTab = shallowRef(tabs[1]);
const currentTabVModel = ref(currentTab.value.key)
const store = useStore();
const escListener = (e: KeyboardEvent) => {
    if (e.key == 'Escape') store.state.ui.showPreferencesModal = false
}
onMounted(() => {
    // const headerSettingsEl = document.getElementById('header-settings-form');
    // if (headerSettingsEl) maxHeight.value = headerSettingsEl.getBoundingClientRect().height + 'px'
})
</script>

<style scoped>
:root {
    --va-modal-dialog-min-height: 1000px
}
input {

    color: black !important;
}
</style>