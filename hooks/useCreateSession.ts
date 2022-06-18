import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

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
    console.log(res);
    return res.json();
};

export const useCreateSession = (workflowId: string) => {
    const { isLoading, error, data } = useQuery("createSession", () =>
        fetchCreateSession(workflowId)
    );
    const { sessionId, setSessionId } = useContext(GlobalContext);

    useEffect(() => {
        if (
            !isLoading &&
            data != undefined &&
            data.session_id &&
            sessionId != data.session_id
        ) {
            setSessionId(data.session_id as string);
        }
    }, [isLoading]);
};
