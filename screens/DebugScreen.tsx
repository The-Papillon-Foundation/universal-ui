import { View, Text } from "native-base";
import React from "react";
import AddressQuestion from "../components/AddressQuestion";

type Props = {};

const addressQuestion = {
    id: "0016",
    question: {
        type: "Address",
        prompt: "What is your mailing address?",
    },
    on_true: null,
    on_false: null,
};

const DebugScreen = (props: Props) => {
    const handleResponse = (value: string) => {
        console.log("response pressed", value, process.env.NODE_ENV);
    };

    return (
        <View>
            <AddressQuestion
                prompt={addressQuestion.question.prompt}
                handleResponse={handleResponse}
            />
        </View>
    );
};

export default DebugScreen;
