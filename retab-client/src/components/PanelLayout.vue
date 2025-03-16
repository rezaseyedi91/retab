<template>
  <div>
    <va-layout>
      <template #top>
        <VaNavbar color="primary">
          <template #left>
            <VaNavbarItem>
              <span class="font-bold text-2xl">
                reTab
              </span>
            </VaNavbarItem>
          </template>
          <template #center>
            <router-link to="/doc">
              <VaNavbarItem>
                Docs
              </VaNavbarItem>

            </router-link>
          </template>
          <template #right>
            <div class="flex items-baseline gap-x-3">

              <VaNavbarItem>
                <DocPreferences />
              </VaNavbarItem>
              <VaNavbarItem>
                <ShortkeysGuid/>
              </VaNavbarItem>
              <VaNavbarItem>
                <ConnectionChecker />
              </VaNavbarItem>
            </div>

          </template>
        </VaNavbar>

      </template>
    </va-layout>
  </div>
  <div class="p-5">
    <slot />
  </div>
</template>

<script setup lang="ts">

import ConnectionChecker from '@/components/ConnectionChecker.vue';
import DocPreferences from '@/components/RezTabDoc/DocPreferences/index.vue';
import ShortkeysGuid from './ShortkeysGuid.vue';
</script>