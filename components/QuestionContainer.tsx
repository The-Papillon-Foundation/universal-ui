import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Center, Container } from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";

type Props = {
    children: ReactNode;
};

const QuestionContainer: React.FC<Props> = ({ children }) => {
    return <View>{children}</View>;
};

export default QuestionContainer;

const styles = StyleSheet.create({});
