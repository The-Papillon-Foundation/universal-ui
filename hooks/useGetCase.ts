import { useContext } from "react";
import { useQuery } from "react-query";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";
import { User, WorkflowSession } from "../types";

const fetchCases = async (userId: string) => {
    if (userId === "") return;
    // get user
    const res = await fetch(`${url}/users/${userId}`);
    const user: User = await res.json();

    const workflowSessions: WorkflowSession[] = [];
    // get workflow sessions
    for (const workflowSession of user.workflowSessions) {
        const res = await fetch(`${url}/workflow-sessions/${workflowSession}`);
        const workflowSessionJson: WorkflowSession = await res.json();
        workflowSessions.push(workflowSessionJson);
    }
    return { documents: user.documents, workflowSessions };
};

const useGetCase = () => {
    const { userId } = useContext(GlobalContext);
    const { isLoading, error, data } = useQuery(
        ["getCases", userId],
        () => fetchCases(userId),
        { enabled: userId !== "" }
    );

    return {
        isLoading,
        error,
        cases: data?.workflowSessions,
        documents: data?.documents,
    };
};

export default useGetCase;
