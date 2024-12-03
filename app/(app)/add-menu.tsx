import * as ImagePicker from 'expo-image-picker';

import { AddMenuFormType, MenuType } from "@/types";
import { Button, Input, RadioGroup, ScrollView, Text, TextArea, YStack } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { Image, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { MenuContext } from '../_layout';
import { Platform } from 'react-native';
import { RadioGroupItemWithLabel } from "@/components";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/header';
import { useContext } from 'react';
import { useNavigation } from 'expo-router';
import { useState } from "react";
import uuid from 'react-native-uuid';

export default function AddMenuItem() {
    const [image, setImage] = useState<string | null>(null);
    const { menuData, setMenuData } = useContext(MenuContext);

    const { goBack } = useNavigation();

    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm<AddMenuFormType>({
        defaultValues: {
            id: uuid.v4(),
            name: '',
            description: '',
            amount: '0',
            image: '',
            course: ''
        }
    });

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const _image = Platform.OS === 'ios' ? result.assets[0].uri.replace("file://", "") : result.assets[0].uri;
            setImage(_image);
            setValue('image', _image, { shouldValidate: true });
            setError("image", { type: "manual", message: "" });
        }
    };

    const onSubmit = handleSubmit(data => storeData(data));

    const storeData = async (value: MenuType) => {
        try {
            setMenuData((prevData: any[]) => [...prevData, value]);
            goBack();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <YStack flex={1} padding={16} gap={16}>
            <SafeAreaView>
                <ScreenHeader title='Add Menu' />
                <ScrollView contentContainerStyle={{ paddingTop: 16 }}>
                    <YStack gap={16}>
                        <YStack gap={8}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <>
                                        {image && (
                                            <>
                                                <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
                                                <Button onPress={pickImage} theme={'active'}>Change Image</Button>
                                            </>
                                        )}
                                        {
                                            !image &&
                                            (
                                                <>
                                                    <Text>Pick Image</Text>
                                                    <TouchableOpacity
                                                        onPress={pickImage}
                                                        style={{ padding: 16, height: 80, backgroundColor: '#fafafa', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                    >
                                                        <Feather name="image" size={40} color="#9e9e9e" />
                                                    </TouchableOpacity>
                                                </>
                                            )
                                        }
                                    </>
                                )}
                                name="image"
                            />

                            {errors.image && <Text color={"#f44336"}>Image is required.</Text>}
                        </YStack>
                        <YStack gap={8}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        flex={1}
                                        placeholder="Name"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="name"
                            />
                            {errors.name && <Text color={"#f44336"}>Name is required.</Text>}
                        </YStack>

                        <YStack gap={8}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        flex={1}
                                        placeholder="Amount"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="amount"
                            />
                            {errors.amount && <Text color={"#f44336"}>Amount is required.</Text>}
                        </YStack>

                        <YStack gap={8}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <RadioGroup onBlur={onBlur} onValueChange={onChange} value={value} display="flex" flexDirection="row">
                                        <RadioGroupItemWithLabel size="$4" value="starter" label="Starter" />
                                        <RadioGroupItemWithLabel size="$4" value="main" label="Main" />
                                        <RadioGroupItemWithLabel size="$4" value="desert" label="Desert" />
                                    </RadioGroup>
                                )}
                                name="course"
                            />
                            {errors.course && <Text color={"#f44336"}>Course is required.</Text>}
                        </YStack>

                        <YStack gap={8}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextArea
                                        flex={1}
                                        placeholder="Description"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        rows={4}
                                    />
                                )}
                                name="description"
                            />
                            {errors.description && <Text color={"#f44336"}>Description is required.</Text>}
                        </YStack>
                        <Button onPress={onSubmit} theme={'active'}>Submit</Button>
                    </YStack>
                </ScrollView>
            </SafeAreaView>
        </YStack>
    )
};