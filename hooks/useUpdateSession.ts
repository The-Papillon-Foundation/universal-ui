import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

const updateSession = async (
    questionId: string,
    response: any,
    sessionId: string
) => {
    const res = await fetch(
        `${url}/workflow-sessions/${sessionId}/questions/${questionId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: response,
            }),
        }
    );
    console.log(res.url, res.status);
    return res.json();
};

export const useUpdateSession = () => {
    const { sessionId } = useContext(GlobalContext);
    return {
        updateSession: (questionId: string, response: any) =>
            updateSession(questionId, response, sessionId),
    };
};
