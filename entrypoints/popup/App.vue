<!-- Parent Component -->
<script lang="ts" setup>
  import NavbarVue from "../../components/Navbar.vue";
  import PromptCard from '../../components/PromptCard.vue';
</script>

<template>
  <div class="w-full h-[80vh] fixed top-[5rem] bottom-[10rem] ">
    <NavbarVue />
    <div class="h-[90%] custom-scroll">
        <PromptCard />
    </div>
  </div>
</template>

