<template>
<div>
  <div>
    <va-layout>
      <template #top>
        <VaNavbar color="primary" class="items-center ">
          <template #left>
            <VaNavbarItem>
              <Logo  />
            </VaNavbarItem>
          </template>
          <template #center>
              <VaNavbarItem >
                {{ store.state.currentUser?.name }}
                | Admin Panel
              </VaNavbarItem>
          </template>
          <template #right>
            <div class="flex items-baseline  gap-x-0">
              <VaNavbarItem class="self-center">
                <va-button @click="store.dispatch('logout')"><va-icon name="logout" size="large" /></va-button>
              </VaNavbarItem>
              <VaNavbarItem class="self-center">
                <router-link class="h-full" to="/doc/new" target="_blank">
                  <va-icon>
                  </va-icon>
                </router-link>
              </VaNavbarItem>


            </div>

          </template>
        </VaNavbar>

      </template>
    </va-layout>
    
  </div>
  <div class="p-5"><slot /></div>
</div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import Logo from './utils/Logo.vue';

const store = useStore();
</script>