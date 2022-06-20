/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Landing: undefined;
    Home: undefined;
    DetermineWorkflow: undefined;
    Workflow: { stateName: string };
    Modal: undefined;
    NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >;

export interface Question {
    type: "TrueOrFalse" | "Address" | "MultipleChoice" | "Text" | "Date";
    prompt: string;
    pass: string[];
    options: string[];
    fail: null;
}

export type QuestionCard = {
    id: string;
    question: Question;
    on_true: string | null;
    on_false: "exit";
};

export interface QuestionGroup {
    cards: QuestionCard[];
    id: string;
    name: "string";
}

export interface Module {
    name: string;
    id: string;
    card_groups: QuestionGroup[];
}

export interface WorkflowPayload {
    name: string;
    id: string;
    eligibility_module: Module;
    process_module: Module;
}
