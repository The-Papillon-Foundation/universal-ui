import { StyleSheet } from "react-native";
import React from "react";
import { Button, Stack, Text } from "native-base";
import QuestionContainer from "./QuestionContainer";
import { customTheme } from "../papillon-design-system/custom-theme";
import { RouteProp } from "@react-navigation/native";
import { QuestionStackParams } from "../screens/QuestionScreen";

type Props = {
    prompt: string;
    handleResponse: (response: "yes" | "no") => void;
};

const YesOrNoQuestion = ({ prompt, handleResponse }: Props) => {
    return (
        <QuestionContainer>
            <Text
                color={customTheme.colors["on-surface"].text}
                fontFamily={"question-text"}
                textAlign={"center"}
                w={"300"}
            >
                {prompt}
            </Text>
            <Stack direction={"row"} space="2.5" mt="2" px="8">
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse("yes")}
                >
                    Yes
                </Button>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => handleResponse("no")}
                >
                    No
                </Button>
            </Stack>
        </QuestionContainer>
    );
};

export default YesOrNoQuestion;

const styles = StyleSheet.create({});
