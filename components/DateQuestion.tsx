import React from "react";
import { Button, Stack, Text } from "native-base";
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
    return (
        <>
            <QuestionPrompt>{prompt}</QuestionPrompt>
            <Stack space="2.5" mt="2">
                {/* <View bg="green.100" height={"30%"}> */}
                <DatePickerInput
                    locale="en"
                    value={inputDate}
                    onChange={(d) => setInputDate(d)}
                    inputMode="start"
                    activeOutlineColor={customTheme.colors.primary[500]}
                    withModal={false}
                    withDateFormatInLabel={false}
                    style={{
                        backgroundColor: "transparent",
                        textAlign: "center",
                        height: 40,
                        justifyContent: "center",
                    }}
                    mode="outlined" //(see react-native-paper docs)
                    autoFocus
                />
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
