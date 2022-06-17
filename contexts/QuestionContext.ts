import { createContext, Dispatch, SetStateAction } from "react";

export const QuestionContext = createContext<{
    finishedCardGroups: string[];
    setFinishedCardGroups: Dispatch<SetStateAction<string[]>>;
}>({
    finishedCardGroups: [],
    setFinishedCardGroups: () => {},
});
