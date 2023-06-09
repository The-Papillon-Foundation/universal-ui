import { Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../types";
import ErrorBoundaryScreen from "./ErrorBoundaryScreen";

export default function NotFoundScreen({
    navigation,
}: RootStackScreenProps<"NotFound">) {
    return (
        <View style={styles.container}>
            <ErrorBoundaryScreen
                title="404"
                message="We're sorry. This page doesn't exist."
            />
            <TouchableOpacity
                onPress={() => navigation.replace("Landing")}
                style={styles.link}
            >
                <Text style={styles.linkText}>Go to the landing screen!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
});
