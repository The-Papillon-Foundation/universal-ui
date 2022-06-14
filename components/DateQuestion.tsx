import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Heading, Text } from "native-base";
import { DatePickerInput } from "react-native-paper-dates";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionContainer from "./QuestionContainer";

type Props = {
    place: number;
    prompt: string;
    handleResponse: (event: GestureResponderEvent) => void;
};

const DateQuestion = ({ place, prompt, handleResponse }: Props) => {
    const [inputDate, setInputDate] = React.useState<Date | undefined>(
        undefined
    );
    return (
        <QuestionContainer>
            <Heading
                color={customTheme.colors["on-surface"].heading}
                fontFamily={"question-heading"}
            >
                Question {place + 1}
            </Heading>
            <Text
                color={customTheme.colors["on-surface"].text}
                fontFamily={"question-text"}
                textAlign={"center"}
                w={"300"}
            >
                {prompt}
            </Text>
            <DatePickerInput
                locale="en"
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="start"
                withModal={false}
                withDateFormatInLabel={false}
                style={{
                    backgroundColor: "transparent",
                    borderBottomColor: "yellow",
                    textAlign: "center",
                    color: "blue",
                    maxHeight: "100%",
                }}
                mode="flat" //(see react-native-paper docs)
                underlineColor={
                    customTheme.colors["date-field-outline-inactive"]
                }
                activeUnderlineColor={
                    customTheme.colors["date-field-outline-active"]
                }
            />
            <Button
                bgColor={customTheme.colors["button-surface"]}
                onPress={handleResponse}
            >
                Submit
            </Button>
        </QuestionContainer>
    );
};

export default DateQuestion;

const styles = StyleSheet.create({});
