import { Text } from "native-base";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const QuestionPrompt = ({ children }: Props) => {
    return (
        <Text fontFamily="sf-pro" fontSize={["lg", "3xl"]}>
            {children}
        </Text>
    );
};

export default QuestionPrompt;
