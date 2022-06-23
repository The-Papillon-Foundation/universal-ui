import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Input, Stack, Text } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    prompt: string;
    handleResponse: (value: string) => void;
};

const TextInputQuestion = ({ prompt, handleResponse }: Props) => {
    const [value, setValue] = useState("");

    const handleChange = (text: string) => {
        setValue(text);
    };

    return (
        <>
            <Text textAlign={"center"} w={"300"}>
                {prompt}
            </Text>
            <Stack direction={"row"} space="2.5" mt="2" px="8">
                <Input
                    value={value}
                    w="75%"
                    maxW="300px"
                    onChangeText={handleChange}
                    placeholder="Value Controlled Input"
                    onSubmitEditing={() => {
                        setValue("");
                        handleResponse(value);
                    }}
                    isFocused={true}
                />
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => {
                        setValue("");
                        handleResponse(value);
                    }}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
};

export default TextInputQuestion;

const styles = StyleSheet.create({});
