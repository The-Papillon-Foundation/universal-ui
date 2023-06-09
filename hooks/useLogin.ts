import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useContext, useState } from "react";
import { Platform } from "react-native";
import { sessionIdKey, userIdKey } from "../constants/LocalStorage";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";
import { RootStackParamList } from "../types";

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

export const useLogin = (
    navigation?: StackNavigationProp<RootStackParamList, "Login">
) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId, sessionId, setSessionId } = useContext(GlobalContext);
    const [error, setError] = useState<string | null>();

    const logout = () => {
        setUserId("");
        setSessionId("");
        AsyncStorage.clear();
    };

    const createAccount = async (userId: string) => {
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

    const login = async (userId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            // get user
            const res = await fetch(`${url}/users/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resjson = await res.json();
            console.log(resjson);
            if (resjson.userId == userId) {
                // attach user to sessionId

                setUserId(userId);
                AsyncStorage.setItem(userIdKey, userId);
                if (
                    resjson.workflowSessions &&
                    resjson.workflowSessions.length > 0
                ) {
                    let sessionId = resjson.workflowSessions[0];
                    setSessionId(sessionId);
                    AsyncStorage.setItem(sessionIdKey, sessionId);
                }
                if (Platform.OS == "web") initializePendo(userId);
                navigation?.navigate("Home");
            } else {
                setError("This user id does not exist. Please try again.");
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return { login, logout, isLoading, error, createAccount };
};
