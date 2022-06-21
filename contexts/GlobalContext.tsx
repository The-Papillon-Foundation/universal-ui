import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";

export const GlobalContext = createContext<{
    sessionId: string;
    setSessionId: Dispatch<SetStateAction<string>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
}>({
    sessionId: "",
    setSessionId: () => {},
    userId: "",
    setUserId: () => {},
});

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [sessionId, setSessionId] = useState("");
    const [userId, setUserId] = useState("");

    return (
        <GlobalContext.Provider
            value={{ sessionId, setSessionId, userId, setUserId }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
