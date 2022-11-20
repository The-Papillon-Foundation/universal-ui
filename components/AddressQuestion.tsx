import { ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    CheckIcon,
    FormControl,
    Input,
    Select,
    Stack,
    Text,
    View,
} from "native-base";
import {
    AddressAutocompleteFeature,
    AddressAutocompleteResponse,
} from "../types";
import * as yup from "yup";
import states from "../assets/data/states.json";
import QuestionButton from "./QuestionButton";
import QuestionHeader from "./QuestionHeader";

type Props = {
    prompt: string;
    help?: string;
    handleResponse: (addressFieldObject: AddressFieldObject) => void;
};

type AddressField = "address1" | "address2" | "city" | "state" | "zip";
export interface AddressFieldObject {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
}

const addressSchema = yup.object().shape({
    address1: yup.string().required("Street Address is a required field."),
    address2: yup.string().optional(),
    city: yup.string().required("City is a required field."),
    state: yup.string().required("State is a required field."),
    zip: yup.string().required("Zip Code is a required field."),
});

const AddressQuestion = ({ prompt, help, handleResponse }: Props) => {
    const [validatingAddress, setValidatingAddress] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [fields, setFields] = useState<AddressFieldObject>({
        address1: "",
        address2: "",
        city: "",
        zip: "",
        state: "",
    });
    const customerFacingFieldNames = {
        address1: "Street Address",
        address2: "Apt/Suite/Other",
        city: "City",
        zip: "Zip Code",
        state: "State",
    };
    const inputElement = useRef<{ focus: () => void }>(null);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<
        AddressAutocompleteFeature[]
    >([]);

    const handleChange = (text: string, key: string) => {
        setFields({ ...fields, [key]: text });
        if (key === "address1") getAutoComplete(text);
    };

    const validateAddress = () => {
        setErrors({});
        addressSchema
            .validate(fields, { abortEarly: false })
            .then((value) => {
                checkIfAddressExists().then((exists) => {
                    if (exists) handleResponse(fields);
                });
            })
            .catch((reason) => {
                const errors: { [key: string]: string } = {};
                for (const error of reason.inner) {
                    errors[error.path] = error.message;
                }
                setErrors({ ...errors });
            });
    };

    const autoPopulate = (feature: AddressAutocompleteFeature) => {
        setSuggestions([]);
        const props = feature.properties;
        setFields({
            address1: props.address_line1,
            address2: fields.address2,
            city: props.city || "",
            zip: props.postcode!,
            state: (states as any)[
                Object.keys(states).find(
                    (state: string) =>
                        (states as any)[state] == props.state_code
                ) as string
            ],
        });
    };

    const checkIfAddressExists = async () => {
        setValidatingAddress(false);
        return true;
        const text = `${fields.address1} ${fields.address2} ${fields.city} ${fields.zip} ${fields.state}`;
        try {
            setValidatingAddress(true);
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/search?text=${encodeURI(
                    text
                )}&apiKey=${process.env.GEOAPIFY_API_KEY}&filter=countrycode:us`
            );
            const result = await response.json();
            if (result.features[0].properties.rank.confidence < 0.5) {
                alert(
                    "We couldn't confirm the existence of this address. Please ensure you have typed in the correct information."
                );
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setValidatingAddress(false);
        }
    };

    const getAutoComplete = async (text: string) => {
        setLoadingSuggestions(true);
        await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURI(
                text
            )}t&apiKey=${process.env.GEOAPIFY_API_KEY}&filter=countrycode:us`
        )
            .then((response) => response.json())
            .then((result: AddressAutocompleteResponse) => {
                result.features = result.features.filter(
                    (feature) => feature.properties.housenumber != undefined
                );
                setSuggestions(result.features);
            })
            .catch((error) => console.log("error", error));
        setLoadingSuggestions(false);
    };

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [prompt]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <QuestionHeader prompt={prompt} help={help} />
            <Stack direction={"column"} space="2.5" mt="2" px="8">
                {Object.keys(fields).map((field_key, index) => (
                    <FormControl
                        key={field_key}
                        isInvalid={errors[field_key] != undefined}
                        style={{
                            zIndex: field_key === "address1" ? 2 : 0,
                        }}
                    >
                        <FormControl.Label
                            _text={{
                                bold: true,
                            }}
                        >
                            {
                                customerFacingFieldNames[
                                    field_key as AddressField
                                ]
                            }
                        </FormControl.Label>
                        {field_key == "state" ? (
                            <Select
                                selectedValue={fields.state}
                                minWidth="200"
                                accessibilityLabel="Select a state."
                                placeholder="Select a state."
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={2}
                                onValueChange={(value) =>
                                    handleChange(value, field_key)
                                }
                            >
                                {Object.keys(states).map(
                                    (name: string, index) => (
                                        <Select.Item
                                            key={index}
                                            label={name}
                                            value={(states as any)[name]}
                                        />
                                    )
                                )}
                            </Select>
                        ) : (
                            <>
                                <Input
                                    ref={index === 0 ? inputElement : undefined}
                                    value={fields[field_key as AddressField]}
                                    onChangeText={(value) =>
                                        handleChange(value, field_key)
                                    }
                                    // onKeyPress={(e) => {
                                    //     console.log();
                                    //     getAutoComplete();
                                    // }}
                                    placeholder=""
                                    autoFocus={index === 0}
                                />
                                {field_key === "address1" &&
                                    (loadingSuggestions ||
                                        suggestions.length > 0) && (
                                        <View
                                            borderColor={"#d4d4d4"}
                                            borderWidth={1}
                                            borderRadius={5}
                                            width={"100%"}
                                            minHeight={"50px"}
                                            justifyContent={"center"}
                                            style={{
                                                position: "absolute",
                                                flex: 1,
                                                top: "65px",

                                                backgroundColor: "white",
                                                zIndex: 2,
                                            }}
                                        >
                                            {loadingSuggestions && (
                                                <ActivityIndicator
                                                    style={{
                                                        alignSelf: "center",
                                                    }}
                                                />
                                            )}

                                            {suggestions.map(
                                                (suggestion, index) => (
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            autoPopulate(
                                                                suggestion
                                                            )
                                                        }
                                                        key={index}
                                                    >
                                                        <View my={2} p={2}>
                                                            <Text>
                                                                {
                                                                    suggestion
                                                                        .properties
                                                                        .formatted
                                                                }
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            )}
                                        </View>
                                    )}
                            </>
                        )}
                        <FormControl.ErrorMessage
                            _text={{
                                fontSize: "xs",
                            }}
                        >
                            {errors[field_key]}
                        </FormControl.ErrorMessage>
                    </FormControl>
                ))}
                <QuestionButton
                    onPress={validateAddress}
                    isLoading={validatingAddress}
                >
                    Submit
                </QuestionButton>
            </Stack>
        </ScrollView>
    );
};

export default AddressQuestion;
