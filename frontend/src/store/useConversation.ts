import { create } from "zustand";
import type { ConversationUser } from "../types/types";

interface ConversationState {
  selectedConversation: ConversationUser | null;
  setSelectedConversation: (selectedConversation: ConversationUser | null) => void;
  messages: any[]; 
  setMessages: (messages: any[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;
