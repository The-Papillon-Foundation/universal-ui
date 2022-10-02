import { Camera, CameraCapturedPicture } from "expo-camera";
import * as DocumentPicker from "expo-document-picker";
import { useContext, useEffect, useRef, useState } from "react";
import { url } from "../constants/Urls";
import { GlobalContext } from "../contexts/GlobalContext";
const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve: (value: string) => void, _) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            return resolve((reader.result as string).split(",")[1] as string);
        };

        reader.readAsDataURL(blob);
    });
};

export const useIdUpload = () => {
    const { userId } = useContext(GlobalContext);
    const [documentResult, setDocumentResult] =
        useState<DocumentPicker.DocumentResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [documentUri, setDocumentUri] = useState("");
    const cameraRef = useRef<Camera | null>(null);
    const [photoInfo, setPhotoInfo] = useState<CameraCapturedPicture | null>();

    // user data
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [usState, setUsState] = useState("");
    const [zip, setZip] = useState("");

    const handleSubmit = async () => {
        // TODO
        try {
            await fetch(`${url}/users/${userId}/attributes`, {
                method: "PUT",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const openDocumentPicker = () => {
        DocumentPicker.getDocumentAsync().then((documentResult) => {
            setIsUploaded(false);
            setDocumentResult(documentResult);
            if (documentResult.type === "success")
                setDocumentUri(documentResult.uri);
        });
    };

    const clearUpload = () => {
        setIsUploaded(false);
        setDocumentResult(null);
        setIsLoading(false);
    };

    const openCamera = async () => {
        setCameraOpen(true);
    };

    const takePicture = async () => {
        let pic = await cameraRef.current?.takePictureAsync();
        setPhotoInfo(pic);
        setCameraOpen(false);
    };

    const retakePicture = () => {
        setPhotoInfo(null);
        setCameraOpen(true);
    };

    const uploadDocument = async () => {
        if (documentResult == null && photoInfo == null) {
            return alert("must select document to upload");
        }

        const body: { [key: string]: string } = {};
        if (photoInfo && photoInfo.uri) {
            setCameraOpen(false);
            body.image = photoInfo.uri.split(",")[1];
        } else if (
            documentResult &&
            documentResult.type == "success" &&
            documentResult.file
        ) {
            body.image = await blobToBase64(documentResult.file);
        } else {
            console.error("No valid image found");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${url}/users/${userId}/id`, {
                method: "POST",
                body: JSON.stringify(body),
            });
            if (res.status == 201) {
                const resjson = await res.json();
                console.log(resjson);
                const userInfo: { [key: string]: string } = resjson.userInfo;

                setFirstName(userInfo.FIRST_NAME || "");
                setMiddleName(userInfo.MIDDLE_NAME || "");
                setLastName(userInfo.LAST_NAME || "");
                setAddress(userInfo.ADDRESS || "");
                setCity(userInfo.CITY_IN_ADDRESS || "");
                setUsState(userInfo.STATE_NAME || "");
                setZip(userInfo.ZIP_CODE_IN_ADDRESS || "");
                setDateOfBirth(new Date(userInfo.DATE_OF_BIRTH || new Date()));

                setIsUploaded(true);
            }
        } catch (error) {
            alert(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {}, [cameraRef]);

    return {
        openDocumentPicker,
        documentResult,
        isLoading,
        isUploaded,
        documentSelected: documentResult ? true : false,
        uploadDocument,
        clearUpload,
        userInfo: {
            firstName,
            lastName,
            middleName,
            address,
            city,
            zip,
            usState,
            dateOfBirth,
            setFirstName,
            setMiddleName,
            setLastName,
            setAddress,
            setCity,
            setZip,
            setUsState,
            setDateOfBirth,
        },
        handleSubmit,
        cameraRef,
        cameraOpen,
        openCamera,
        takePicture,
        retakePicture,
        photoInfo,
        documentUri,
    };
};
