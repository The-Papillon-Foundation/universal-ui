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
}>({
    sessionId: "",
    setSessionId: () => {},
});

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [sessionId, setSessionId] = useState("");

    return (
        <GlobalContext.Provider value={{ sessionId, setSessionId }}>
            {children}
        </GlobalContext.Provider>
    );
};
