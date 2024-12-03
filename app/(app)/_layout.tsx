import Header from "@/components/header";
import { Stack } from "expo-router";

export default function AppLayout() {
    return(
        <Stack
            screenOptions={{
                headerBackTitle: "",
                headerShown: false,
                header: (props) => <Header {...props} />
            }}
        >
            <Stack.Screen name="add-menu" options={{
                title: "Add Menu",
            }} />
            <Stack.Screen name="edit-menu" options={{
                title: "Edit Menu",
            }} />
        </Stack>
    )
}