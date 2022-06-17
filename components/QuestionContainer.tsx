import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Center, Container } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    children: JSX.Element;
};

const QuestionContainer: React.FC<Props> = ({ children }) => {
    return (
        <Center flex={1} bgColor={customTheme.colors.surface}>
            <Container maxH={"50%"} centerContent>
                {children}
            </Container>
        </Center>
    );
};

export default QuestionContainer;

const styles = StyleSheet.create({});
