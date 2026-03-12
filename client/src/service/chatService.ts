import {$http} from "../api/http.ts";

class ChatService {
  async sendPrompt(text: string) {
    const res = await $http.post('/chat', {text})
    return res.data
  }
}

export {
  ChatService
}
