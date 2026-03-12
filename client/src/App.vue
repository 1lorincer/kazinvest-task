<script setup lang="ts">
import { nextTick, ref } from "vue";
import IconLogo from "./components/IconLogo.vue";
import InputPrompt from "./components/InputPrompt.vue";
import ListMessages from "./components/ListMessages.vue";
import { ChatService } from "./service/chatService.ts";
import type { ChatMessage } from "./types/ChatTypes.ts";
import { useSpeechRecognition } from "./composables/useSpeechRecognition.ts";

const prompt = ref("");
const messages = ref<ChatMessage[]>([]);
const isLoading = ref(false);

const { isListening, toggle: clickVoice, stop: stopVoice } =
  useSpeechRecognition((transcript) => {
    prompt.value = transcript;
  });

const sendPrompt = async (textFromInput?: string) => {
  const text = (textFromInput ?? prompt.value).trim();
  if (!text) return;

  if (isListening.value) stopVoice();

  const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
  messages.value.push(userMsg);
  prompt.value = "";
  await nextTick();

  isLoading.value = true;
  try {
    const chatService = new ChatService();
    const res = await chatService.sendPrompt(text);
    const answerText = res?.reply ?? "…";
    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: answerText,
    };
    messages.value.push(botMsg);
  } catch (e: any) {
    messages.value.push({
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Ошибка при запросе. Попробуй ещё раз.",
    });
    console.log(`API CHAT ERROR: ${e?.response?.data?.message}`);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="">
    <IconLogo />
    <h1 class="text-3xl text-white font-bold mt-10">Hi there !</h1>
    <h2 class="text-4xl text-white font-bold mt-10">What would u like to know?</h2>
    <p class="text-gray-300 text-lg my-6">
      Use one of the most common prompts below <br />or ask a question of your own
    </p>
    <div class="pb-20">
      <ListMessages :messages="messages" />
    </div>
    <div class="fixed left-16 right-0 bottom-0 p-6">
      <InputPrompt
        v-model:prompt="prompt"
        :is-loading="isLoading"
        :is-listening="isListening"
        @click-voice="clickVoice"
        @send-prompt="sendPrompt"
      />
    </div>
  </div>
</template>

<style scoped></style>
