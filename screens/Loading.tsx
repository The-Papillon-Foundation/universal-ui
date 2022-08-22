import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { Spinner } from "native-base";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Loading">;
};

const Loading = ({ navigation }: Props) => {
    const { checkedForSession, sessionId } = useContext(GlobalContext);

    useEffect(() => {
        if (checkedForSession) {
            console.log(sessionId);
            if (sessionId != "") {
                navigation.navigate("Home");
            } else {
                navigation.navigate("Landing");
            }
        }
    }, [checkedForSession]);

    return (
        <View>
            <Spinner color="grey" />
        </View>
    );
};

export default Loading;
