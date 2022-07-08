import React from "react";
import { Button, Stack, Text } from "native-base";
import { DatePickerInput } from "react-native-paper-dates";
import { customTheme } from "../papillon-design-system/custom-theme";

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
            <Text textAlign={"center"} w={"300"}>
                {prompt}
            </Text>
            <Stack direction={"row"} space="2.5" mt="2" px="8">
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
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    onPress={() => {
                        if (inputDate != undefined) handleResponse(inputDate);
                    }}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
};

export default DateQuestion;
