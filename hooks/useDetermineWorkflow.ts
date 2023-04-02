import { useQuery } from "react-query";
import { url } from "../constants/Urls";

interface WorkflowObject {
    workflowId: string;
    workflowName: string;
    workflowStatus: "ACTIVE" | "INACTIVE";
}

const fetchWorkflows = async () => {
    const res = await fetch(`${url}/workflows`);
    return res.json();
};

export const useDetermineWorkflow = () => {
    const { isLoading, data, error } = useQuery("fetchWorkflows", () =>
        fetchWorkflows()
    );

    return {
        isLoading,
        workflows: data as WorkflowObject[],
        error,
    };
};
