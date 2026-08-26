<script setup lang="ts">
import AdminPanelLayout from '@/components/AdminPanelLayout.vue';

</script>

<template>
    <admin-panel-layout>
          <h2 class="va-h2">
                Admin Dashboard
            </h2>
            
        <div>
            
            <router-link :to="{name: 'admin-users-management', query: {page: '1'}}" > 
                <va-card color="success" class="w-fit min-w-52 mt-10">
                    <va-card-content >
                        Users
                    </va-card-content>
                </va-card>
                </router-link>
        </div>
    </admin-panel-layout>
</template>