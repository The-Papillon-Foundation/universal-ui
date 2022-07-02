import React, { useState } from "react";
import QuestionContainer from "../components/QuestionContainer";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    Box,
    Button,
    CheckIcon,
    Heading,
    Select,
    Text,
    View,
} from "native-base";
import states from "../assets/data/states.json";
import { useDetermineWorkflow } from "../hooks/useDetermineWorkflow";
import { ActivityIndicator } from "react-native";

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "DetermineWorkflow">;
}

const DetermineWorkflow = ({ navigation }: Props) => {
    const { isLoading, workflows, error } = useDetermineWorkflow();
    const [checkingForWorkflow, setCheckingForWorkflow] = useState(false);
    const [state, setState] = useState<string | undefined>();
    const handleResponse = () => {
        if (state == undefined) return;
        setCheckingForWorkflow(true);
        if (
            workflows.findIndex(
                (workflow) => workflow.workflowId == state.toLocaleLowerCase()
            ) != -1
        ) {
            // Workflow exists
            navigation.navigate("Workflow", { stateName: state });
        } else {
            // Workflow doesn't exist
            navigation.navigate("Ineligible", {
                message: `We currently do not offer our services to clients residing in ${Object.keys(
                    states
                ).find((key) => (states as any)[key] == state)}`,
            });
        }
        setCheckingForWorkflow(false);
    };
    return (
        <View flex={1} alignItems={"center"} justifyContent="center">
            <QuestionContainer>
                {error && <Text color={"danger.500"}>{error as any}</Text>}
                {isLoading == true && error == undefined ? (
                    <ActivityIndicator color="grey" size={"large"} />
                ) : (
                    <Box w="3/4">
                        <Heading textAlign={"center"}>
                            Which state do you live in?
                        </Heading>
                        <Select
                            selectedValue={state}
                            minWidth="200"
                            accessibilityLabel="Select a state."
                            placeholder="Select a state."
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={2}
                            onValueChange={(itemValue) => setState(itemValue)}
                        >
                            {Object.keys(states).map((name: string, index) => (
                                <Select.Item
                                    key={index}
                                    label={name}
                                    value={(states as any)[name]}
                                />
                            ))}
                        </Select>
                        <Button
                            isLoading={checkingForWorkflow}
                            mt={2}
                            onPress={handleResponse}
                            disabled={state == undefined}
                            isDisabled={state == undefined}
                        >
                            Submit
                        </Button>
                    </Box>
                )}
            </QuestionContainer>
        </View>
    );
};

export default DetermineWorkflow;
