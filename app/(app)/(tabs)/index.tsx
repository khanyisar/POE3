import { CourseType, MenuType } from '@/types';
import { EmptyState, MenuCardItem } from '@/components';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

import { MenuContext } from '@/app/_layout';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Menu() {
  const { menuData } = useContext(MenuContext);
  const [tabs] = useState<CourseType[]>(['starter', 'main', 'dessert']);
  const [selectedTab, setSelectedTab] = useState<CourseType>('starter');
  const [items, setItems] = useState<MenuType[]>([]);

  useEffect(() => {
    setItems(menuData?.filter((item: MenuType) => item?.course === selectedTab));
  }, [selectedTab, menuData]);

  return (
    <YStack flex={1} padding={16} gap={16}>
      <Text fontSize={28} fontWeight={'600'}>Bougee Chef</Text>
      <XStack gap={8}>
        {
          tabs.map((tab: CourseType, index: number) => (
            <TouchableOpacity key={index} onPress={() => setSelectedTab(tab)}>
              <XStack backgroundColor={selectedTab === tab ? 'black' : 'lightgray'} paddingVertical={8} paddingHorizontal={16} borderRadius={16}>
                <Text color={selectedTab === tab ? 'white' : 'black'} fontSize={16} textTransform={'capitalize'}>{tab}</Text>
              </XStack>
            </TouchableOpacity>
          ))
        }
      </XStack>
      <FlatList
        data={items}
        renderItem={({ item }) => <MenuCardItem {...item} />}
        keyExtractor={item => item.id}
        style={{ gap: 16 }}
        ListEmptyComponent={<EmptyState />}
      />
    </YStack>
  );
}