import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

const updateSession = async (
    update: {
        [key: string]: number | string | {};
    },
    sessionId: string
) => {
    const res = await fetch(`${url}/workflow-sessions`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            update,
            sessionId,
        }),
    });
    console.log(res);
    return res.json();
};

export const useUpdateSession = () => {
    const { sessionId } = useContext(GlobalContext);
    return { updateSession: (update: {}) => updateSession(update, sessionId) };
};
