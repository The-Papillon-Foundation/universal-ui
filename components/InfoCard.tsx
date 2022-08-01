import { Platform, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Spacer, Stack, Text, View } from "native-base";
import QuestionButton from "./QuestionButton";
import QuestionPrompt from "./QuestionPrompt";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    title?: string;
    text: string;
    handleResponse: () => void;
};

const InfoCard = ({ text, title, handleResponse }: Props) => {
    return (
        <>
            {title && (
                <Text
                    fontFamily="poppins-semibold"
                    color={customTheme.colors.info_card_title}
                    fontSize={["2xl", "3xl"]}
                    mb={"10px"}
                >
                    {title}
                </Text>
            )}
            <Text fontFamily={"sf-pro"} fontSize={["sm", "md"]} mb={"10px"}>
                {text}
            </Text>
            <Stack direction={"column"} space="24px" mt="2">
                <QuestionButton
                    onPress={() => {
                        handleResponse();
                    }}
                >
                    Continue
                </QuestionButton>
            </Stack>
        </>
    );
};

export default InfoCard;

const styles = StyleSheet.create({});
