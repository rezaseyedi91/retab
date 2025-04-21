<template>
   <span>
      {{ name }}<span v-if="accidUnicode" v-html="accidUnicode"/>
   </span>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
const props = defineProps<{ pname?: string | null }>();
const name = shallowRef(props.pname?.[0]);
const sharpUnicode = '&#x266F', flatUnicode = '&#x266d'
const accidUnicode = shallowRef(!props.pname?.[1] ? undefined : props.pname?.[1] == '#' ?  sharpUnicode : flatUnicode)

</script>