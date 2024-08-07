<!-- PromptCard.vue -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Prompt } from '@/utils/type';

const prompts = ref<Prompt[]>([]);
const choiedPrompt = ref<string>('');

onMounted(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/prompt", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data: Prompt[] = await res.json().then(response => response.data);
      prompts.value = data;
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
});

function handleCardClick(id: string) {
  const selectedPrompt = prompts.value.find((prompt: Prompt) => prompt.id === id);
  choiedPrompt.value = id;
  if (selectedPrompt) {
    const event = new CustomEvent('prompt-selected', {
      detail: { description: selectedPrompt.description },
    });
    window.dispatchEvent(event);
  }
}
</script>

<template>
  <div class="p-4 mb-10 h-full  overflow-auto custom-scroll">
    <div class="grid grid-cols-2 gap-4 p-4">
      <div
        v-for="card in prompts"
        :key="card.id"
        :class="[
          'border',
          'rounded-lg',
          'p-4',
          'shadow-lg',
          'flex',
          'flex-col',
          'mb-1',
          'cursor-pointer',
          choiedPrompt === card.id ? 'border-gray-500 bg-blue-200' : ''
        ]"
        @click="handleCardClick(card.id)"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="flex gap-x-2">
            <span v-for="tag in card.tags" :key="tag" class="text-xs text-gray-500">{{ tag }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ card.author }}</span>
        </div>
        <h1 class="text-lg font-bold">{{ card.title }}</h1>
        <p class="text-sm text-gray-600 mt-2">{{ card.description }}</p>
        <div class="mt-auto text-xs text-gray-500">{{ card.author }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

</style>
