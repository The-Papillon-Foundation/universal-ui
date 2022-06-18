import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { WorkflowPayload } from "../types";
import { url } from "../constants/Urls";

const payloadUrl = `${url}workflows/`;

const fetchPayload = async (stateName: string) => {
    const res = await fetch(payloadUrl + stateName, { mode: "cors" });
    console.log(res);
    return res.json();
};

const usePayload = (stateName: string) => {
    const { isLoading, error, data } = useQuery("payload", () =>
        fetchPayload(stateName)
    );
    return {
        isLoading,
        error,
        payload:
            data != undefined ? (data.payload as WorkflowPayload) : undefined,
    };
};

export default usePayload;
