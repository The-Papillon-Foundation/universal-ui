import React, { ReactNode } from "react";
import { View } from "native-base";

type Props = {
    children: ReactNode;
};

const QuestionContainer: React.FC<Props> = ({ children }) => {
    return (
        <View
            bgColor={"white"}
            w={{ base: "100%", md: "75%" }}
            maxW={900}
            h={{ base: "100%", md: "75%" }}
            p={"25px"}
            borderRadius={"40px"}
            borderBottomRadius={{ base: 0, md: undefined }}
            justifyContent={"center"}
        >
            {children}
        </View>
    );
};

export default QuestionContainer;
