import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Center, Container } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    children: ReactNode;
};

const QuestionContainer: React.FC<Props> = ({ children }) => {
    return (
        <Center flex={1}>
            <Container maxH={"50%"} centerContent>
                {children}
            </Container>
        </Center>
    );
};

export default QuestionContainer;

const styles = StyleSheet.create({});
