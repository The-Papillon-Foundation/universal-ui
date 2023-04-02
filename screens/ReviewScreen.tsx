import { View, Text, ScrollView, Platform } from "react-native";
import React from "react";
import { useReview } from "../hooks/useReview";
import { Button, Spinner } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Review">;
};

const ReviewScreen = ({ navigation }: Props) => {
    const { notSignedIn, loading, error, session, workflow } = useReview();
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                paddingTop: Platform.OS == "web" ? 5 : 35,
            }}
        >
            <Button onPress={() => navigation.navigate("Home")}>Go Home</Button>
            <View style={{ flex: 1, padding: 15 }}>
                {error && <Text>{JSON.stringify(error)}</Text>}
                {loading && <Spinner color="grey" />}
                {notSignedIn && (
                    <Text>You are not signed in. Go back to Landing.</Text>
                )}
                {!loading && session != null && workflow != null && (
                    <ScrollView style={{ padding: 10 }}>
                        {workflow.eligibility_module.card_groups.map(
                            (card_group) => {
                                return card_group.cards.map((card) => {
                                    return (
                                        <View
                                            key={card.id}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <View style={{ margin: 10 }}>
                                                <Text>
                                                    {card.question!.prompt}
                                                </Text>
                                            </View>
                                            <View style={{ margin: 10 }}>
                                                <Text>
                                                    {session.sessionState[
                                                        card.id
                                                    ] ||
                                                        "You didn't answer this question."}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                });
                            }
                        )}
                        {workflow.process_module.card_groups.map(
                            (card_group) => {
                                return card_group.cards.map((card) => {
                                    return (
                                        <View
                                            key={card.id}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <View style={{ margin: 10 }}>
                                                <Text>
                                                    {card.question!.prompt}
                                                </Text>
                                            </View>
                                            <View style={{ margin: 10 }}>
                                                <Text>
                                                    {session.sessionState[
                                                        card.id
                                                    ] || "No answer"}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                });
                            }
                        )}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

export default ReviewScreen;
