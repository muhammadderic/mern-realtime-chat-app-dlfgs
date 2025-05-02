import { useState } from "react";
import toast from "react-hot-toast";

type UseLoginReturn = {
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
};

const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<void> => {
    const success = handleInputErrors(username, password);
		if (!success) return;

    setLoading(true);

    try {
			const res = await fetch("http://localhost:5000/api/v1/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			console.log("Login");
		} catch (error) {
			if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
		} finally {
			setLoading(false);
		}
  }

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username: string, password: string): boolean {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}