import { useQuery } from "react-query";
import { url } from "../constants/Urls";

export const fetchEligibilityModule = async (stateName: string) => {
    const res = await fetch(
        `${url}/workflows/${stateName}/modules/eligibility`
    );
    console.log(res.status);
    return res.json();
};

const useEligibilityModule = (stateName: string) => {
    const { isLoading, error, data } = useQuery("eligibilityModule", () =>
        fetchEligibilityModule(stateName)
    );
    return {
        isLoading,
        error,
        eligibilityModule: data,
    };
};

export default useEligibilityModule;
