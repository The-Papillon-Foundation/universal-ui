import { createContext, Dispatch, SetStateAction } from "react";

export const WorkflowContext = createContext<{
    finishedCardGroups: string[];
    setFinishedCardGroups: Dispatch<SetStateAction<string[]>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}>({
    finishedCardGroups: [],
    setFinishedCardGroups: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});
