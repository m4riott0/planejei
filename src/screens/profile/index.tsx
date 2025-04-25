import colors from "@/src/constants/colors";
import { ProfileData } from "@/src/hooks/useProfile";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
  Pressable,
  ActivityIndicator
} from "react-native";

interface ProfileScreenProps {
  logout: () => Promise<void>;
  loading: boolean;
  profile: ProfileData | null;
}


export function ProfileScreen({ logout, loading, profile }: ProfileScreenProps) {
  const router = useRouter();

  if (loading || !profile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.row}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={40} color={colors.white} />
          </Pressable>

          <Text style={styles.title}>Meu perfil</Text>
        </View>


        <View style={styles.card}>
          <Text style={styles.label}>Nome completo:</Text>
          <Text style={styles.value}>
            {profile?.name}
          </Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>
            {profile?.email}
          </Text>

          <Text style={styles.label}>Conta criada em:</Text>
          <Text style={styles.value}>
            {profile?.createdAt}
          </Text>

        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={async () => await logout()}
        >
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.zinc
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.zinc,
    padding: Platform.OS === 'ios' ? 16 : 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    fontWeight: '600'
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: colors.gray200,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: colors.white,
  },
  value: {
    color: colors.gray100,
    marginBottom: 14,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButtonText: {
    color: colors.red,
  }
})