<template>
    <div class="p-8 flex flex-col gap-4 items-center justify-center">
        <h3 class="va-h3">
            Server is down
        </h3>
        <va-button color="info" icon="refresh" @click="$router.go(-1)">
            <span class="px-2">
                retry   
            </span>
        </va-button>
    </div>
</template>