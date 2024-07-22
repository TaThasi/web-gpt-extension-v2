<script lang="ts" setup>
    import Toolbar from './Toolbar.vue'
    import LoginForm from './LoginForm.vue';
</script>

<template>
    <nav class=" h-[10vh] w-full items-center flex justify-center text-center">
        <div class="">
            <h1 class="text-4xl font-bold">OneClick <span class=" text-blue-500">prompt</span></h1>
            <LoginForm />
        </div>

        <div class="flex items-center justify-center right-4 absolute px-4">
            <Toolbar /> 
        </div>
    </nav>
</template>
