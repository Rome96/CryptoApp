import { Stack } from "expo-router";
import { colors } from "../src/utilities/color";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.gallery,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Crypto App" }} />
    </Stack>
  );
}
