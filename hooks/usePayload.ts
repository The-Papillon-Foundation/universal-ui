import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { WorkflowPayload } from "../types";

const payloadUrl =
    "https://r6knd0l9s8.execute-api.us-east-1.amazonaws.com/beta/workflows";

const fetchPayload = async () => {
    const res = await fetch(payloadUrl, { mode: "cors" });
    console.log(res);
    return res.json();
};

const usePayload = () => {
    const { isLoading, error, data } = useQuery("payload", fetchPayload);
    return {
        isLoading,
        error,
        payload:
            data != undefined ? (data.payload as WorkflowPayload[]) : undefined,
    };
};

export default usePayload;
