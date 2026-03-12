<script setup lang="ts">
interface Props {
  isLoading?: boolean;
  isListening?: boolean;
}

interface Emits {
  (e: 'sendPrompt', prompt: string): void;
  (e: 'clickVoice'): void;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  isListening: false,
});

const prompt = defineModel<string>("prompt");
const emits = defineEmits<Emits>();

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    emits('sendPrompt', prompt.value ?? '');
  }
};
</script>

<template>
  <div
    class="relative flex items-stretch rounded-xl w-1/3 border-2 transition-colors"
    :class="isListening ? 'border-red-500' : 'border-cyan-700'"
  >
    <button
      @click="emits('clickVoice')"
      class="flex items-center justify-center w-10 flex-shrink-0 transition-colors"
      :class="isListening ? 'text-red-500' : 'text-cyan-700'"
      :title="isListening ? 'Остановить запись' : 'Голосовой ввод'"
    >
      <span v-if="isListening" class="relative flex items-center justify-center">
        <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-50"></span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 relative" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
        </svg>
      </span>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-3" fill="none" viewBox="0 0 24 24"
           stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
      </svg>
    </button>

    <input
      type="text"
      v-model="prompt"
      :disabled="isLoading"
      @keydown="handleKeydown"
      class="flex-1 px-3 py-2 rounded-l-lg text-gray-200 outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
      :placeholder="isListening ? 'Говорите...' : 'Ask whatever u want'"
    />

    <button
      @click="emits('sendPrompt', prompt ?? '')"
      :disabled="isLoading || isListening"
      class="flex items-center justify-center text-white bg-cyan-700 rounded-r-lg w-12 hover:bg-cyan-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"/>
      </svg>
    </button>
  </div>
</template>
