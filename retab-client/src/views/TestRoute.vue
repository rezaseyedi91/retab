<template>
    <DevTest>
        <div class="p-12">
            <br>
            <va-button>
                Test
            </va-button>
        </div>
    </DevTest>
</template>

<script setup lang="ts">
import DevTest from '@/components/utils/DevTest.vue'
import { useDoc } from '@/composables/useDoc';
import RezTabFile from '@/store/modules/RezTabFile';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const doc = useDoc();

async function test() {
    doc.undo()
}

</script>