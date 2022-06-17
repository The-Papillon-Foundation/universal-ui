import { RouteProp, useRoute } from "@react-navigation/native";
import { Center, Container, Heading, Text } from "native-base";
import { QuestionStackParams } from "./QuestionScreen";

export const IneligibleScreen = () => {
    const { params } = useRoute<RouteProp<QuestionStackParams, "Ineligible">>();
    return (
        <Center flex={1} justifyContent="center">
            <Container centerContent>
                <Heading>You are ineligible for expungment</Heading>
                {params?.message && (
                    <Text textAlign={"center"}>{params.message}</Text>
                )}
            </Container>
        </Center>
    );
};
