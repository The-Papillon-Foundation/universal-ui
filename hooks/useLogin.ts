import { useContext, useState } from "react";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId, sessionId } = useContext(GlobalContext);

    const login = async (userId: string) => {
        setIsLoading(true);
        setUserId(userId);
        try {
            const res = await fetch(`${url}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                }),
            });
            console.log(res.status, res.url);
            if (res.ok) {
                const res2 = await fetch(`${url}/workflow-sessions`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sessionId,
                        userId,
                    }),
                });
                console.log(res2.status, res2.url);
            }
        } catch (error) {
            alert(error);
        }
        setIsLoading(false);
    };

    return { login, isLoading };
};
