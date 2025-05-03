import { useState } from "react";
import toast from "react-hot-toast";

import useConversation from "../store/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (messageText: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/messages/send/${selectedConversation?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setMessages([...messages, data.data]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
