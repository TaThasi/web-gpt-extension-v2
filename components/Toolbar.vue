<template>
    <div class="toolbar">
      <select class="language-select">
        <option v-for="language in languages" :key="language.value" :value="language.value">
          {{ language.text }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts" setup>
        const languages = [
          { value: 'en', text: 'English' },
          { value: 'es', text: 'Spanish' },
          { value: 'fr', text: 'French' },
          { value: 'de', text: 'German' },
          // Add more languages as needed
        ]
  </script>
  
  <style scoped>
 
  </style>
  