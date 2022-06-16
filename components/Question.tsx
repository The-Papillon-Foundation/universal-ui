import { NativeEventEmitter, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import {
    QuestionContext,
    QuestionStackParams,
} from "../screens/QuestionScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import YesOrNoQuestion from "./YesOrNoQuestion";
import DateQuestion from "./DateQuestion";
import MultiSelectQuestion from "./MultiSelectQuestion";
import { StackNavigationProp } from "@react-navigation/stack";
import AddressQuestion from "./AddressQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

type Props = {};

const Question = (props: Props) => {
    const route = useRoute<RouteProp<QuestionStackParams, "Question">>();
    const navigation =
        useNavigation<StackNavigationProp<QuestionStackParams, "Question">>();
    const { params } = route;

    const _handleResponse = () => {};

    switch (params.card.question.type) {
        case "TrueOrFalse":
            return <YesOrNoQuestion route={route} navigation={navigation} />;
        case "Address":
            return <AddressQuestion route={route} navigation={navigation} />;
        case "MultipleChoice":
            return (
                <MultipleChoiceQuestion route={route} navigation={navigation} />
            );
        // case "MultiSelectQuestion":
        //     return (
        //         <MultiSelectQuestion
        //             place={params.place}
        //             prompt={params.prompt}
        //             options={params.options!}
        //             handleResponse={_handleResponse}
        //         />
        //     );
        default:
            return (
                <Text>
                    Unable to find this type of question:{" "}
                    {params.card.question.type}
                </Text>
            );
    }
};

export default Question;

const styles = StyleSheet.create({});
