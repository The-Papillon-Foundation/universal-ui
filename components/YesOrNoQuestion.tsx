import { StyleSheet } from "react-native";
import React from "react";
import { Button, Stack, Text, VStack } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    prompt: string;
    handleResponse: (response: "yes" | "no") => void;
};

const YesOrNoQuestion = ({ prompt, handleResponse }: Props) => {
    return (
        <>
            <Text textAlign={"center"} w={"300"}>
                {prompt}
            </Text>
            <VStack space="2.5" mt="2" px="8">
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
            </VStack>
        </>
    );
};

export default YesOrNoQuestion;

const styles = StyleSheet.create({});
