import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { userIdKey } from "../constants/LocalStorage";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId, sessionId, setSessionId } = useContext(GlobalContext);

    const logout = () => {
        setUserId("");
        setSessionId("");
        AsyncStorage.clear();
    };

    const login = async (userId: string) => {
        setIsLoading(true);
        setUserId(userId);
        AsyncStorage.setItem(userIdKey, userId);
        try {
            // create user
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
                // attach user to sessionId
                const res2 = await fetch(
                    `${url}/workflow-sessions/${sessionId}/questions/set-user`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId,
                        }),
                    }
                );
                console.log(res2.status, res2.url);
            }
        } catch (error) {
            alert(error);
        }
        setIsLoading(false);
    };

    return { login, logout, isLoading };
};
