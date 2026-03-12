import {onMounted, onUnmounted, ref} from "vue";

export function useSpeechRecognition(onResult: (transcript: string) => void) {
  const isListening = ref(false);
  const isSupported = !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition);

  const SpeechRecognitionClass =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;

  let recognition: any = null;
  if (isSupported) {
    recognition = new SpeechRecognitionClass();
    recognition.lang = "ru-RU";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      onResult(transcript);
    };

    recognition.onend = () => {
      isListening.value = false;
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech error:", event.error);
      isListening.value = false;
    };
  }

  const toggle = () => {
    if (!isSupported || !recognition) return;
    if (isListening.value) {
      recognition.stop();
    } else {
      recognition.start();
      isListening.value = true;
    }
  };

  const stop = () => recognition?.stop();

  const handleVisibilityChange = () => {
    if (document.hidden && isListening.value) recognition.stop();
  };

  onMounted(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  });
  onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    recognition?.stop();
  });
  return {isListening, isSupported, toggle, stop};
}
