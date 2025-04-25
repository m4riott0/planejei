import { useState, useEffect } from 'react'
import { router } from "expo-router";
import { authService } from "../services/auth-service";
import { supabase } from '../config/supabase';

export interface ProfileData {
  email: string;
  name: string;
  createdAt: string;
}

const useProfile = () => {

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getUser();

      if (data) {
        setProfile({
          email: data?.user?.email ?? "Email nao informado...",
          name: data?.user?.user_metadata?.name ?? "Nome não informado...",
          createdAt: new Date(data?.user?.created_at!).toLocaleDateString("pt-BR")
        })
      }

      setLoading(false);
    }

    loadProfile();
  }, [])

  const logout = async () => {
    await authService.signOut();
    router.replace("/(auth)/signin/page")
  }

  return {
    logout,
    loading,
    profile
  }
}

export default useProfile;