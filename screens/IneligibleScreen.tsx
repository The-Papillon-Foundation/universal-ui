import { RouteProp, useRoute } from "@react-navigation/native";
import { Center, Container, Heading, Text } from "native-base";

export const IneligibleScreen = () => {
    return (
        <Center flex={1} justifyContent="center">
            <Container centerContent>
                <Heading>You are ineligible for expungment</Heading>
            </Container>
        </Center>
    );
};
