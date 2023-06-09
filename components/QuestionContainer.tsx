import React, { ReactNode } from "react";
import { View } from "native-base";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryScreen from "../screens/ErrorBoundaryScreen";

type Props = {
    children: ReactNode;
};

const QuestionContainer: React.FC<Props> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
            <View
                bgColor={"white"}
                w={{ base: "100%", md: "75%" }}
                maxW={900}
                h={{ base: "100%", md: "75%" }}
                p={"25px"}
                borderRadius={"20px"}
                borderBottomRadius={{ base: 0, md: undefined }}
                justifyContent={"center"}
                style={{
                    shadowColor: "#DCDCDC",
                    shadowOpacity: 0.56,
                    shadowRadius: 20,
                    shadowOffset: { width: 2, height: 4 },
                }}
            >
                {children}
            </View>
        </ErrorBoundary>
    );
};

export default QuestionContainer;
