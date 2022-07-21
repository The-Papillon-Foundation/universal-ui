import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    CheckIcon,
    FormControl,
    Heading,
    Input,
    Select,
    Stack,
    Text,
    View,
    WarningOutlineIcon,
} from "native-base";
import { customTheme } from "../papillon-design-system/custom-theme";
import {
    AddressAutocompleteFeature,
    AddressAutocompleteResponse,
} from "../types";
import * as yup from "yup";
import states from "../assets/data/states.json";

type Props = {
    prompt: string;
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

const AddressQuestion = ({ prompt, handleResponse }: Props) => {
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
        const text = `${fields.address1} ${fields.address2} ${fields.city} ${fields.zip} ${fields.state}`;
        try {
            setValidatingAddress(true);
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/search?text=${encodeURI(
                    text
                )}&apiKey=${process.env.GEOAPIFY_API_KEY}&filter=countrycode:us`
            );
            const result = await response.json();
            if (result.features[0].properties.rank.confidence < 1) {
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

    const getAutoComplete = async () => {
        const text = `${fields.address1} ${fields.address2} ${fields.city} ${fields.zip} ${fields.state}`;
        setLoadingSuggestions(true);
        await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURI(
                text
            )}&apiKey=${process.env.GEOAPIFY_API_KEY}&filter=countrycode:us`
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
        <>
            <Heading textAlign={"center"}>{prompt}</Heading>
            <Stack direction={"column"} space="2.5" mt="2" px="8">
                {Object.keys(fields).map((field_key, index) => (
                    <FormControl
                        key={field_key}
                        isInvalid={errors[field_key] != undefined}
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
                            <Input
                                ref={index === 0 ? inputElement : undefined}
                                value={fields[field_key as AddressField]}
                                onChangeText={(value) =>
                                    handleChange(value, field_key)
                                }
                                placeholder=""
                                autoFocus={index === 0}
                            />
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
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={() => {
                        getAutoComplete();
                    }}
                >
                    Search for address
                </Button>
                <Button
                    bgColor={customTheme.colors["button-surface"]}
                    color={customTheme.colors["on-button-surface"]}
                    onPress={validateAddress}
                    isLoading={validatingAddress}
                >
                    Submit
                </Button>{" "}
                <View>
                    {loadingSuggestions && <ActivityIndicator />}
                    {suggestions.length > 0 && (
                        <>
                            <Heading>Suggestions</Heading>
                            <Text>Click to autopopulate</Text>
                        </>
                    )}
                    {suggestions.map((suggestion, index) => (
                        <TouchableOpacity
                            onPress={() => autoPopulate(suggestion)}
                            key={index}
                        >
                            <View
                                borderColor={
                                    customTheme.colors["button-surface"]
                                }
                                borderWidth={1}
                                borderRadius={5}
                                my={2}
                                p={2}
                            >
                                <Text>{suggestion.properties.formatted}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Stack>
        </>
    );
};

export default AddressQuestion;

const styles = StyleSheet.create({});
