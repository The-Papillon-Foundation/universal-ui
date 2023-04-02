import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import ErrorBoundaryScreen from "./ErrorBoundaryScreen";

interface Props {
    route: RouteProp<RootStackParamList, "Ineligible">;
}

export const IneligibleScreen = ({ route }: Props) => {
    return (
        <ErrorBoundaryScreen
            title="You are ineligible for expungment"
            message={
                route.params.message ||
                "Based on your answers we cannot assist you at this moment."
            }
        />
    );
};
