import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import { EmptyState, ManageCardItem } from '@/components';
import { useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { MenuContext } from '@/app/_layout';
import { MenuType } from '@/types';
import { router } from 'expo-router';

export default function Manage() {
    const { menuData } = useContext(MenuContext);

    return (
        <>
            <YStack flex={1} padding={16} gap={16}>
                <XStack justifyContent='space-between' alignItems='center'>
                    <Text fontSize={28} fontWeight={'600'}>Menu Management</Text>

                </XStack>
                <FlatList
                    data={menuData}
                    renderItem={({ item }) => <ManageCardItem {...item} />}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<EmptyState />}
                    style={{ gap: 16 }}
                />
            </YStack>
            <Button elevate color={"white"} bottom={40} right={40} height={70} width={70} borderRadius={50} position="absolute" backgroundColor="#2196f3" icon={<Feather name="plus" size={32} color="white" />} size="$3" onPress={() => router.push('/add-menu')} />
        </>
    );
}