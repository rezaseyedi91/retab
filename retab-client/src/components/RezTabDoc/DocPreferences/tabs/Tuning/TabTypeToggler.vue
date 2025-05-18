<template>
    <div>
        <VaSwitch v-model="isFrench" color="success" true-inner-label="French" false-inner-label="Italian"
            off-color="success" style="--va-switch-checker-background-color: #fff;" />
        <va-button @click="useDoc().updateUI()">
            <va-icon name="refresh"></va-icon>
        </va-button>
    </div>
</template>

<script setup lang="ts">
import { useDoc } from '@/composables/useDoc';
import { TabType } from '@/store/modules/types';
import { ref, watch } from 'vue';


const isFrench = ref(useDoc().getTabType() == TabType.FRENCH);
watch(isFrench, val => {
    useDoc().setTabType(val == true ? TabType.FRENCH : TabType.ITALIAN)
})

</script>