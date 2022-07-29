import React from "react";
import { Button, Stack, Text, useBreakpointValue, View } from "native-base";
import { DatePickerInput } from "react-native-paper-dates";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionPrompt from "./QuestionPrompt";
import QuestionButton from "./QuestionButton";

type Props = {
    prompt: string;
    handleResponse: (value: Date) => void;
};

const DateQuestion = ({ prompt, handleResponse }: Props) => {
    const [inputDate, setInputDate] = React.useState<Date | undefined>(
        undefined
    );
    const dateFontSize = useBreakpointValue({
        base: 18,
        md: 20,
    });
    return (
        <>
            <QuestionPrompt>{prompt}</QuestionPrompt>
            <Stack space="2.5" mt="2">
                <View w={{ base: "100%", md: "55%" }}>
                    <DatePickerInput
                        locale="en"
                        value={inputDate}
                        onChange={(d) => setInputDate(d)}
                        inputMode="start"
                        activeUnderlineColor={customTheme.colors.cyan[600]}
                        withModal={false}
                        withDateFormatInLabel={false}
                        style={{
                            backgroundColor: "transparent",
                            textAlign: "center",
                            height: 40,
                            justifyContent: "center",
                            fontSize: dateFontSize,
                        }}
                        mode="flat" //(see react-native-paper docs)
                        autoFocus
                        theme={{
                            colors: { text: "#9AB8BF" },
                            fonts: { regular: { fontFamily: "sf-pro" } },
                        }}
                        onSubmitEditing={() => {
                            if (inputDate != undefined) {
                                handleResponse(inputDate);
                            }
                        }}
                    />
                </View>

                {/* </View> */}
                <QuestionButton
                    onPress={() => {
                        if (inputDate != undefined) handleResponse(inputDate);
                    }}
                >
                    Submit
                </QuestionButton>
            </Stack>
        </>
    );
};

export default DateQuestion;
