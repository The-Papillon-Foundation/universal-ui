import React from "react";
import { Stack, Text } from "native-base";
import QuestionButton from "./QuestionButton";
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
