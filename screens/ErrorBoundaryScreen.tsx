import { Text, View } from "native-base";
import React from "react";
import { Image } from "react-native";
import HelpText from "../components/HelpText";
import QuestionPrompt from "../components/QuestionPrompt";

type Props = {};

const ErrorBoundaryScreen = (props: Props) => {
    return (
        <View flex={1} justifyContent={"center"} alignItems="center">
            <QuestionPrompt>We're sorry</QuestionPrompt>
            <HelpText>An error has occurred</HelpText>
            <View
                style={{
                    width: 200,
                    height: 100,
                }}
            >
                <Image
                    source={require("../assets/images/error-cat.png")}
                    style={{
                        flex: 1,
                        resizeMode: "contain",
                    }}
                />
            </View>
        </View>
    );
};

export default ErrorBoundaryScreen;
