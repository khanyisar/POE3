import { Text, XStack } from 'tamagui';

import { Feather } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from 'expo-router';

export type Props = NativeStackHeaderProps;
export default function Header({ back, options, route }: Props) {
    const { goBack, canGoBack } = useNavigation();
    const title = getHeaderTitle(options, route.name);
    const showBack = back?.title;

    const handleBack = () => {
        if (canGoBack()) {
            goBack();
            return;
        }
    }

    return (
        <XStack alignItems='center'>
            {showBack ? <TouchableOpacity onPress={handleBack}>
                <Feather name="chevron-left" size={32} />
            </TouchableOpacity> : null}
            <Text fontSize={18}>{title}</Text>
        </XStack>
    )
}

export function ScreenHeader({ title }: { title: string }) {
    const { goBack, canGoBack } = useNavigation();

    const handleBack = () => {
        if (canGoBack()) {
            goBack();
            return;
        }
    }

    return (
        <XStack alignItems='center'>
            <TouchableOpacity onPress={handleBack}>
                <Feather name="chevron-left" size={32} />
            </TouchableOpacity>
            <Text fontSize={18}>{title}</Text>
        </XStack>
    )
}