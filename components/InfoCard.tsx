import React from "react";
import { Stack, Text } from "native-base";
import QuestionButton from "./QuestionButton";
import { customTheme } from "../hooks/useCachedResources";

type Props = {
    text: string;
    subtext: string;
    buttonText: string;
    handleResponse: () => void;
};

const InfoCard = ({ text, subtext, buttonText, handleResponse }: Props) => {
    return (
        <>
            <Text
                fontFamily="poppins-semibold"
                color={customTheme.colors.info_card_title}
                fontSize={["2xl", "3xl"]}
                mb={"10px"}
            >
                {text}
            </Text>

            <Text fontFamily={"sf-pro"} fontSize={["sm", "md"]} mb={"10px"}>
                {subtext}
            </Text>
            <Stack direction={"column"} space="24px" mt="2">
                <QuestionButton
                    onPress={() => {
                        handleResponse();
                    }}
                >
                    {buttonText}
                </QuestionButton>
            </Stack>
        </>
    );
};

export default InfoCard;
