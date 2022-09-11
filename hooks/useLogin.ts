import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Platform } from "react-native";
import { userIdKey } from "../constants/LocalStorage";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

// add pendo to window namespace
declare global {
    interface Window {
        pendo: any;
    }
}

window.pendo = window.pendo || {};

const initializePendo = (username: string) => {
    window.pendo.initialize({
        visitor: {
            id: username, // Required if user is logged in, default creates anonymous ID
            // email:        // Recommended if using Pendo Feedback, or NPS Email
            // full_name:    // Recommended if using Pendo Feedback
            // role:         // Optional

            // You can add any additional visitor level key-values here,
            // as long as it's not one of the above reserved names.
        },

        account: {
            id: "ACCOUNT-UNIQUE-ID", // Required if using Pendo Feedback, default uses the value 'ACCOUNT-UNIQUE-ID'
            // name:         // Optional
            // is_paying:    // Recommended if using Pendo Feedback
            // monthly_value:// Recommended if using Pendo Feedback
            // planLevel:    // Optional
            // planPrice:    // Optional
            // creationDate: // Optional

            // You can add any additional account level key-values here,
            // as long as it's not one of the above reserved names.
        },
    });
};

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
                if (Platform.OS == "web") initializePendo(userId);
            }
        } catch (error) {
            alert(error);
        }
        setIsLoading(false);
    };

    return { login, logout, isLoading };
};
