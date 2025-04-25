import { Stack } from "expo-router";

export default function PanelLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="travel/new/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="detail/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}