import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';

import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider, createTamagui } from 'tamagui';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MenuType } from '@/types';
import { Stack } from 'expo-router';
import { createContext } from 'react';
import defaultConfig from '@tamagui/config/v3';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useState } from 'react';

const config = createTamagui(defaultConfig)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)/menu',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const MenuContext = createContext<any>([]);

function RootLayoutNav() {
  const [menuData, setMenuData] = useState<MenuType[]>([]);
  return (
    <MenuContext.Provider value={{ menuData, setMenuData}}>
      <ThemeProvider value={DefaultTheme}>
        <TamaguiProvider config={config}>
          <Stack screenOptions={{ headerBackTitle: "", headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </TamaguiProvider>
      </ThemeProvider >
    </MenuContext.Provider >
  );
}
