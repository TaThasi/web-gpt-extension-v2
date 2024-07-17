<script lang="ts" setup>
    import { Prompt } from '@/utils/type';
    import { ref } from 'vue';
    import { getSavedPrompts } from '@/utils/PromptManager';
    import { onMounted } from 'vue';
    const prompt = ref<Prompt[]>([]); // Use ref to create a reactive array
    // Fetch prompts from your API or database using fetch() or axios.
    onMounted(async () =>{
      const savedPrompts = await getSavedPrompts();
      prompt.value = savedPrompts; // Update the reactive array with fetched prompts.
    })
    console.log("THis is the prompt", prompt.value);


</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4 ">
    <div
      v-for="(card, index) in prompt"
      :key="index"
      class="border rounded-lg p-4 shadow-lg flex flex-col"
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
</template>

<style scoped>
/* Optional custom styling */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
