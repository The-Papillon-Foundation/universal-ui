import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Heading, Text } from "native-base";
import { DatePickerInput } from "react-native-paper-dates";
import { customTheme } from "../papillon-design-system/custom-theme";
import QuestionContainer from "./QuestionContainer";

type Props = {
    prompt: string;
    handleResponse: (value: string | Date) => void;
};

const DateQuestion = ({ prompt, handleResponse }: Props) => {
    const [inputDate, setInputDate] = React.useState<Date | undefined>(
        undefined
    );
    return (
        <>
            <Text textAlign={"center"} w={"300"}>
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
                onPress={() => {
                    console.log("firing");
                    if (inputDate != undefined) handleResponse(inputDate);
                }}
            >
                Submit
            </Button>
        </>
    );
};

export default DateQuestion;

const styles = StyleSheet.create({});
