/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
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
    Login: undefined;
    Case: { sessionId: string };
    DetermineWorkflow: undefined;
    Eligibility: {
        stateName: string;
        groupIndex: number;
        questionIndex: number;
    };
    CreateUser: { stateName: string };
    Process: { stateName: string; groupIndex: number; questionIndex: number };
    Review: undefined;
    Modal: undefined;
    NotFound: undefined;
    Ineligible: { message?: string };
    Debug: undefined;
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

export type Question =
    | {
          type: "TrueOrFalse" | "YesOrNo" | "Address" | "Date" | "PhoneNumber";
          prompt: string;
          options: string[];
          fail: null;
      }
    | {
          type: "MultipleChoice" | "Text";
          pass: string[];
          prompt: string;
          options: string[];
          fail: null;
      };

export type QuestionCard = {
    id: string;
    question?: Question;
    text?: string;
    title?: string;
    next?: string;
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
    image_urls: ImageUrls;
}

export interface ImageUrls {
    logo: string;
    logo_small: string;
    logo_xsmall: string;
}

export interface Colors {
    [key: string]: string;
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

// Geoapify Types
export interface AddressAutocompleteResponse {
    features: AddressAutocompleteFeature[];
}

export interface AddressAutocompleteFeature {
    type: string;
    properties: Properties;
    geometry: Geometry;
    bbox: number[];
}

export interface Properties {
    datasource: Datasource;
    housenumber?: string;
    street: string;
    suburb?: string;
    county: string;
    state: string;
    postcode?: string;
    country: string;
    country_code: string;
    lon: number;
    lat: number;
    state_code: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    category?: string;
    result_type: string;
    rank: Rank;
    place_id: string;
    name?: string;
    city?: string;
}

export interface Datasource {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
}

export interface Rank {
    importance: number;
    confidence: number;
    match_type: string;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

// User types
export interface UserInfo {
    addressZip: string | undefined;
    addressStreet: string | undefined;
    userNameLast: string | undefined;
    addressState: string | undefined;
    userNameFirst: string | undefined;
    userNameMiddle: string | undefined;
    cellPhone: string | undefined;
    email: string | undefined;
    addressCity: string | undefined;
}

export interface User {
    documents: string[];
    workflowSessions: string[];
    userId: string;
    userInfo: UserInfo;
}

// Workflow Session Types
export type QuestionAnswer = { id: string; answers: { user: any } };

export interface CardGroup {
    completion: string;
    description: string;
    module: string;
    name: string;
    questions: QuestionAnswer[];
}

export interface SessionState {
    cardGroups: CardGroup[];
    completion: string;
}

export interface WorkflowSession {
    caseNumber: any;
    createdAt: number;
    sessionId: string;
    sessionState: SessionState;
    updatedAt: number;
    userId: string;
    workflowId: string;
}
