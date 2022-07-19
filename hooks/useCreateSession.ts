import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sessionIdKey } from "../constants/LocalStorage";

const fetchCreateSession = async (workflowId: string) => {
    const res = await fetch(`${url}/workflow-sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            workflowId,
        }),
    });
    console.log(res.url, res.status);
    return res.json();
};

export const useCreateSession = (workflowId: string) => {
    const { sessionId, setSessionId } = useContext(GlobalContext);
    const { isLoading, error, data } = useQuery(
        "createSession",
        () => fetchCreateSession(workflowId),
        { enabled: sessionId == "" }
    );

    useEffect(() => {
        if (
            !isLoading &&
            data != undefined &&
            data.workflowSession != undefined &&
            data.workflowSession.sessionId != undefined &&
            sessionId == ""
        ) {
            console.log("setting session to ", data.workflowSession.sessionId);
            setSessionId(data.workflowSession.sessionId as string);
            AsyncStorage.setItem(sessionIdKey, data.workflowSession.sessionId);
        }
    }, [isLoading]);
};
