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
    Loading: undefined;
    Landing: undefined;
    Home: undefined;
    DetermineWorkflow: undefined;
    Eligibility: { stateName: string };
    CreateUser: { stateName: string };
    Process: { stateName: string };
    Review: undefined;
    Modal: undefined;
    NotFound: undefined;
    Ineligible: { message?: string };
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

export interface SessionState {
    [key: string]: any;
}

export interface Session {
    workflowId: string;
    sessionId: string;
    sessionState: SessionState;
    userId: string;
}

/* Styles JSON */
export interface StylesJson {
    colors: Colors;
    fonts: Fonts;
}

export interface Colors {
    primary: string;
    surface: string;
    "surface-secondary": string;
    "on-surface": OnSurface;
    "button-surface": string;
    "on-button-surface": string;
    "date-field-outline-inactive": string;
    "date-field-outline-active": string;
    "multi-select-active": string;
}

export interface OnSurface {
    heading: string;
    text: string;
}

export interface Fonts {
    default: string;
    "question-heading": string;
    "question-text": string;
}
