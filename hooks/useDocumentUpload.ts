import * as DocumentPicker from "expo-document-picker";
import { useContext, useState } from "react";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";

const documentPickerOptions: DocumentPicker.DocumentPickerOptions = {
    type: "application/pdf",
    multiple: false,
};

export const useDocumentUpload = () => {
    const { userId } = useContext(GlobalContext);
    const [documentResult, setDocumentResult] =
        useState<DocumentPicker.DocumentResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const openDocumentPicker = () => {
        DocumentPicker.getDocumentAsync().then((documentResult) => {
            setDocumentResult(documentResult);
            console.log(documentResult);
        });
    };

    const uploadDocument = async () => {
        if (documentResult == null)
            return alert("must select document to upload");
        if (
            documentResult.type == "success" &&
            documentResult.file != undefined
        ) {
            const data = new FormData();
            data.append(documentResult.name, documentResult.file);
            setIsLoading(true);
            try {
                const res = await fetch(`${url}/documents`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-Papillon-User-Id": userId,
                        "X-Papillon-File-Name": documentResult.name,
                    },
                    body: data,
                });
                console.log(res);
            } catch (error) {
                alert(error);
            }
            setIsLoading(false);
        }
    };

    return {
        openDocumentPicker,
        documentResult,
        isLoading,
        documentSelected: documentResult ? true : false,
        uploadDocument,
    };
};
