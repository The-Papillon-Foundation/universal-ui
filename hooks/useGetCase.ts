import { useQuery } from "react-query";
import { url } from "../constants/Urls";
import { WorkflowSession } from "../types";

const fetchCase = async (sessionId: string) => {
    if (sessionId === "") return;

    const res = await fetch(`${url}/workflow-sessions/${sessionId}`);
    return res.json() as Promise<WorkflowSession>;
};

const useGetCase = (sessionId: string) => {
    const { isLoading, error, data } = useQuery(
        ["getCase", sessionId],
        () => fetchCase(sessionId),
        { enabled: sessionId !== "" }
    );
    return {
        isLoading,
        error,
        currentCase: data,
    };
};

export default useGetCase;
