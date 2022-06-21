import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { WorkflowPayload } from "../types";
import { url } from "../constants/Urls";

const workflowUrl = `${url}/workflows/`;

const fetchWorkflow = async (stateName: string) => {
    const res = await fetch(workflowUrl + stateName, { mode: "cors" });
    console.log(res.status);
    return res.json();
};

const useWorkflow = (stateName: string) => {
    const { isLoading, error, data } = useQuery("payload", () =>
        fetchWorkflow(stateName)
    );
    return {
        isLoading,
        error,
        data: data as WorkflowPayload,
    };
};

export default useWorkflow;
