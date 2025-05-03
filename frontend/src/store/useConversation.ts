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
  setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;
