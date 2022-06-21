import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { GlobalContext } from "../contexts/GlobalContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

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

    useEffect(() => {
        if (sessionId == "") {
            navigation.navigate("Landing");
        }
    }, [sessionId]);

    return (
        <View>
            <ActivityIndicator color="grey" />
        </View>
    );
};

export default Loading;
