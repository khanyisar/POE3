import { Text, YStack } from "tamagui";

import { FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const EmptyState: FC = () => {
    return(
        <YStack height={300} alignItems={'center'} justifyContent={'center'} gap={16}>
            <MaterialCommunityIcons name="clipboard-off-outline" size={100} color="gray" />
            <Text fontSize={24} color={'gray'}>No data</Text>
        </YStack>
    )
};