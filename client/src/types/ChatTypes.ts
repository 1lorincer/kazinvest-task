type Role = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: Role;
  text: string
};

export type {
  Role, ChatMessage
}
