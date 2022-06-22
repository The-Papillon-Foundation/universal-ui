import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useContext, useState } from "react";
import { Platform } from "react-native";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

export const useDocumentDownload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { sessionId, userId } = useContext(GlobalContext);
    const [progress, setProgress] = useState(0);

    const callback = (downloadProgress: any) => {
        const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
        setProgress(progress);
    };

    const downloadDocument = async () => {
        setIsLoading(true);
        setSuccess(false);
        setError("");
        try {
            const res = await fetch(
                `${url}/users/${userId}/downloads/${sessionId}`
            );
            const json = await res.json();
            if (json.downloadLink) {
                // save to file system.
                if (Platform.OS == "web") {
                    window.open(json.downloadLink);
                } else {
                    const downloadResumable =
                        FileSystem.createDownloadResumable(
                            json.downloadLink,
                            FileSystem.documentDirectory +
                                `Papillon-${Date.now()}.pdf`,
                            {},
                            callback
                        );
                    const { uri } =
                        (await downloadResumable.downloadAsync()) as FileSystem.FileSystemDownloadResult;
                    console.log("Finished downloading to ", uri);
                    if (uri.endsWith("pdf")) {
                        const UTI = "public.item";
                        await Sharing.shareAsync(uri, { UTI });
                    }
                }
            }
        } catch (error) {
            setError(error as string);
            console.log(error);
        }
        setIsLoading(false);
        setProgress(0);
        return;
    };

    return {
        isLoading,
        error,
        success,
        downloadDocument,
        progress,
    };
};