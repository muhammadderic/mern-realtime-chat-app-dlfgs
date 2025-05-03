import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { ConversationUser } from "../types/types";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationUser[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/v1/users", {
					credentials: "include",
				});
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data.data);
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

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
