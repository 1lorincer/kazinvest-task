<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
import type {ChatMessage} from "../types/ChatTypes.ts";


const props = defineProps<{ messages: ChatMessage[] }>();

const bottomRef = ref<HTMLElement | null>(null);

watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    bottomRef.value?.scrollIntoView({behavior: "smooth"});
  }
);
</script>

<template>
  <div class="mt-8 space-y-4">
    <div
      v-for="m in messages"
      :key="m.id"
      class="flex"
      :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
    >
      <div
        class="max-w-[70%] rounded-2xl px-4 py-3 text-white"
        :class="m.role === 'user'
          ? 'bg-cyan-700'
          : 'bg-white/10 border border-white/10'"
      >
        <p class="whitespace-pre-wrap leading-relaxed">{{ m.text }}</p>
      </div>
    </div>

    <div ref="bottomRef"/>
  </div>
</template>
