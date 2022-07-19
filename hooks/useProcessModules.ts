import { useQuery } from "react-query";
import { url } from "../constants/Urls";

export const fetchProcessModules = async (stateName: string) => {
    const res = await fetch(`${url}/workflows/${stateName}/modules/process`);
    console.log(res.status);
    return res.json();
};

const useProcessModules = (stateName: string) => {
    const { isLoading, error, data } = useQuery("processModules", () =>
        fetchProcessModules(stateName)
    );
    return {
        isLoading,
        error,
        processModules: data,
    };
};

export default useProcessModules;
