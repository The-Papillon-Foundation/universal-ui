import { RouteProp } from "@react-navigation/native";
import { Center, Container, Heading, Text } from "native-base";
import { RootStackParamList } from "../types";

interface Props {
    route: RouteProp<RootStackParamList, "Ineligible">;
}

export const IneligibleScreen = ({ route }: Props) => {
    return (
        <Center flex={1} justifyContent="center">
            <Container centerContent>
                <Heading>You are ineligible for expungment</Heading>
                {route.params.message && <Text>{route.params.message}</Text>}
            </Container>
        </Center>
    );
};
