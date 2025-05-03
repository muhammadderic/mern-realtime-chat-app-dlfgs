import { create } from "zustand";
import type { ConversationUser, Message } from "../types/types";

interface ConversationState {
  selectedConversation: ConversationUser | null;
  setSelectedConversation: (selectedConversation: ConversationUser | null) => void;
  messages: Message[]; 
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
