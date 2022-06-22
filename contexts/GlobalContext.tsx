import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sessionIdKey } from "../constants/LocalStorate";

export const GlobalContext = createContext<{
    sessionId: string;
    setSessionId: Dispatch<SetStateAction<string>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    checkingForSession: boolean;
    checkedForSession: boolean;
}>({
    sessionId: "",
    setSessionId: () => {},
    userId: "",
    setUserId: () => {},
    checkingForSession: true,
    checkedForSession: false,
});

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [sessionId, setSessionId] = useState("");
    const [userId, setUserId] = useState("");
    const [checkingForSession, setCheckingForSession] = useState(true);
    const [checkedForSession, setCheckedForSession] = useState(false);

    const getSessionId = async () => {
        const sessionId = await AsyncStorage.getItem(sessionIdKey);
        if (sessionId) setSessionId(sessionId);
        console.log(sessionId);
        setCheckingForSession(false);
        setCheckedForSession(true);
    };

    useEffect(() => {
        getSessionId();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                sessionId,
                setSessionId,
                userId,
                setUserId,
                checkingForSession,
                checkedForSession,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
