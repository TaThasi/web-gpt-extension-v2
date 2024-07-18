<script lang="ts" setup>
    import { Prompt } from '@/utils/type';
    import { ref } from 'vue';
    import { getStoredPrompts } from '../utils/prompt.manager';
    import { onMounted } from 'vue';
    const prompt = ref<Prompt[]>([]); 
    onMounted(async () =>{
      const savedPrompts = await getStoredPrompts();
      prompt.value = savedPrompts; 
    })
</script>

<template>
 <div class=" p-4  mb-10">
  <div class="grid grid-cols-2 gap-4 p-4 ">
    <div
      v-for="(card) in prompt"
      :key="card.id"
      class="border rounded-lg p-4 shadow-lg flex flex-col mb-1"
    >
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs text-gray-500">AI/ML</span> 
        <span class="text-xs text-gray-500">GREEN</span> 
      </div>
      <h1 class="text-lg font-bold cursor-pointer">{{ card.title }}</h1>
      <p class="text-sm text-gray-600 mt-2">{{ card.description }}</p>
      <div class="mt-auto text-xs text-gray-500">{{ card.author }}</div>
    </div>
  </div>
 </div>
</template>

<style scoped>
/* Optional custom styling */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
