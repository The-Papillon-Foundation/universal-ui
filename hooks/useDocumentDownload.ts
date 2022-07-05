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
    const [documentLink, setDocumentLink] = useState("");

    const callback = (downloadProgress: any) => {
        const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
        setProgress(progress);
    };

    const downloadDocument = async () => {
        // save to file system.
        if (Platform.OS == "web") {
            window.open(documentLink);
        } else {
            const downloadResumable = FileSystem.createDownloadResumable(
                documentLink,
                FileSystem.documentDirectory + `Papillon-${Date.now()}.pdf`,
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
    };

    const prepareDownload = async () => {
        setIsLoading(true);
        setSuccess(false);
        setError("");
        //const myWindow = window.open(``);
        try {
            const res = await fetch(
                `${url}/users/${userId}/downloads/${sessionId}`
            );
            const json = await res.json();
            if (json.downloadLink) {
                setDocumentLink(json.downloadLink);
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
        prepareDownload,
        downloadDocument,
        documentLink,
        progress,
    };
};
