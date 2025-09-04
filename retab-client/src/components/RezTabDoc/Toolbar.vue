<template>
    <div class=" border-solid border-2 w-fit">
        <div class="flex" >
            <div v-for="(tool, index) in tools" :key="index" class="cursor-pointer hover:bg-opacity-15 p-1  hover:bg-slate-900"
            @click="tool.cb">
                <va-icon :name="tool.icon"></va-icon>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useDoc } from '@/composables/useDoc'
import {} from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui/web-components'
import { useStore } from 'vuex'

type Tool = {
    icon: string,
    tooltipText?: string,
    cb: (...args: any) => any
}

const tools:Tool[] = [
    {
        icon: 'undo',
        cb: () => useDoc().undo()
    },
    {
        icon: 'redo',
        cb: () =>  useDoc().redo()
    },
    {
        icon: 'save',
        cb: () =>  save()
    }
]

const store = useStore();
const isSaving = ref(false)
const toast = useToast();
const router = useRouter(); 


async function save() {
  isSaving.value = true
  const doc = useDoc();
  let wannaRefreshThepage = !doc.id;
  const result = await doc.save();
  toast.init({
    color: 'success', message: 'Saved Successfully.',
    position: 'bottom-right'
  })



  doc.id = result.id
  doc.unfreeze();
  isSaving.value = false
  if (wannaRefreshThepage) {
    return router.push({ path: '/doc/' + doc.id }), 1000
  } else return doc.unfreeze();

}
</script>