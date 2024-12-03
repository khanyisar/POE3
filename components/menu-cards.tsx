import { Button, Card, Text, XStack, YStack } from "tamagui";
import { FC, useContext } from "react";

import { Feather } from "@expo/vector-icons";
import { Image } from 'react-native';
import { MenuContext } from "@/app/_layout";
import { MenuType } from "@/types";
import { router } from "expo-router";

export const MenuCardItem: FC<MenuType> = (props) => {
    const { name, description, amount, image } = props;
    return (
        <Card size="$4" bordered>
            <Card.Header padded>
                <Image source={{ uri: image }} style={{ width: '100%', height: 150, borderRadius: 4 }} />
            </Card.Header>
            <Card.Footer padded>
                <YStack gap={4}>
                    <Text fontSize={24} fontWeight={'800'} color={'green'}>R{Number(amount)?.toFixed(2)}</Text>
                    <Text fontSize={16} fontWeight={'600'}>{name}</Text>
                    <Text color={'gray'}>{description}</Text>
                </YStack>
            </Card.Footer>
        </Card>
    )
};

export const ManageCardItem: FC<MenuType> = (props) => {
    const { menuData, setMenuData } = useContext(MenuContext);
    const { id, name, description, amount, image } = props;

    const handleEdit = () => {
        router.push({
            pathname: '/edit-menu',
            params: {
                id
            }
        });
        router.setParams({ id });
    };

    const handleDelete = () => {
        const items = menuData?.filter((item: MenuType) => item?.id !== id);
        setMenuData(items);
    };

    return (
        <Card padded gap={16} display="flex" flexDirection="row" marginVertical={8}>
            <Image source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 4 }} />
            <XStack gap={6}>
                <YStack width={"70%"}>
                    <YStack>
                        <Text fontSize={16} fontWeight="600" textTransform="capitalize">{name}</Text>
                        <Text fontWeight={'800'} color={'green'}>R{Number(amount)?.toFixed(2)}</Text>
                    </YStack>
                    <Text color={'gray'}>{description}</Text>
                </YStack>
                <YStack width={"25%"} gap={16}>
                    <Button icon={<Feather name="edit-2" size={16} color="#2196f3" />} size="$2" width={35} onPress={handleEdit} />
                    <Button icon={<Feather name="trash" size={16} color="#f44336" />} size="$2" width={35} onPress={handleDelete} />
                </YStack>
            </XStack>
        </Card>
    )
};