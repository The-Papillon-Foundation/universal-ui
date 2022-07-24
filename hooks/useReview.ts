import { useContext, useEffect, useState } from "react";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";
import { Session, WorkflowPayload } from "../types";
import { fetchWorkflow } from "./useWorkflow";

export const useReview = () => {
    const { checkingForSession, sessionId } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [session, setSession] = useState<Session | null>(null);
    const [workflow, setWorkflow] = useState<WorkflowPayload | null>(null);
    const fetchSessionAndPayload = async (sessionId: string) => {
        try {
            setLoading(true);
            // fetch session
            const sessionRes = await fetch(
                `${url}/workflow-sessions/${sessionId}`
            );
            const sessionJson = await sessionRes.json();
            console.log(sessionJson);
            Object.keys(sessionJson.sessionState).forEach((key) => {
                if (
                    typeof sessionJson.sessionState[key] == "object" &&
                    sessionJson.sessionState[key] != null
                ) {
                    // combine address object in string
                    let obj = sessionJson.sessionState[key];
                    sessionJson.sessionState[key] = `${obj.address1}${
                        obj.address2 != "" ? ", " + obj.address2 + " " : ""
                    } ${obj.city}, ${obj.state}, ${obj.zip}`;
                }
            });
            setSession(sessionJson);
            // fetch workflow
            const workflowJson = await fetchWorkflow(sessionJson.workflowId);
            setWorkflow(workflowJson);
        } catch (error) {
            console.log(error);
            setError(error as string);
        }
        setLoading(false);
    };
    useEffect(() => {
        if (!checkingForSession && sessionId != "") {
            fetchSessionAndPayload(sessionId);
        }
    }, [checkingForSession]);

    return {
        notSignedIn: checkingForSession == false && sessionId == "",
        loading,
        error,
        session,
        workflow,
    };
};
