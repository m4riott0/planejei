import { Stack, router } from "expo-router";
import { useEffect } from 'react'
import { supabase } from '../config/supabase'

export default function RootLayout() {

  useEffect(() => {

    supabase.auth.onAuthStateChange((_event, session) => {

      if (session) {
        router.replace("/(panel)/home/page")
        return;
      }

      router.replace("/(auth)/signin/page")

    })

  }, [])

  return (
    <Stack >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(panel)"
        options={{ headerShown: false }}
      />

    </Stack>
  )
}
