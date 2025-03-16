<template>
    <VaPopover placement="bottom-left" trigger="click" color="secondary">
        <InformationCircleIcon class="w-8 fill-white" />
        <template #title>
            <i>Shortkeys:</i>
        </template>

        <template #body>
            <div class="p-2 rounded-sm shadow-sm w-fit">
                <ul>
                    <li v-for="(shK, index) in shortkeys" :key="index">
                        <span class="font-bold">
                            {{ shK.title }}

                        </span>
                        : {{ shK.value }}
                    </li>
                </ul>
            </div>
        </template>
    </VaPopover>

</template>
<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/solid';

const shortkeys: ({ title: string, value: string })[] = [
    { title: 'Delete', value: 'Shift + DELETE' },
    { title: 'Insert', value: 'Shift + Insert' },
    { title: 'dot', value: '. OR p' },
    { title: 'Insert Measure Before Current Focused Measure', value: 'CTRL + Insert' },
    { title: 'Change Tabgrp Duration', value: 'ALT + ↑ OR ALT + ↓' },
]

</script>
