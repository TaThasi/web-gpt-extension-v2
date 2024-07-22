<template>
    <div class="">
      <select class=" px-4 py-2 rounded-lg text-xl" v-model="selectedLanguage" @change="updateLanguage">
        <option v-for="language in languages" :key="language.value" :value="language.value"
        >
          {{ language.value }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref } from 'vue';

    const languages = [
      { value: 'English' },
      { value: 'Vietnamese' },
      { value: 'Japan' },
      { value: 'German' },

    ]
    const language = localStorage.getItem('language') as string;
    const selectedLanguage = ref<string>(language || "English");
    const updateLanguage = async () => {   
      localStorage.setItem('language', selectedLanguage.value);
    }
  </script>