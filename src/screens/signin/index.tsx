/*
  Scereen > Responsavel por renderizar a parte visual.
*/

import colors from "@/src/constants/colors";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Link } from "expo-router";
import { Control, FieldErrors, UseFormHandleSubmit, Controller } from "react-hook-form";
import { SignInFormData } from "@/src/hooks/useSignin";

interface SignInScreenProps {
  control: Control<SignInFormData>;
  handleSubmit: UseFormHandleSubmit<SignInFormData>;
  onSubmit: (data: SignInFormData) => Promise<void>;
  isSubmitting: boolean;
  errors: FieldErrors<SignInFormData>;
}


export function SignInScreen({
  control,
  handleSubmit,
  onSubmit,
  isSubmitting,
  errors,
}: SignInScreenProps) {
  return (
    <ScrollView
      style={{ backgroundColor: colors.zinc }}
      contentContainerStyle={{ flexGrow: 1, }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.zinc} barStyle="light-content" />

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />


        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email..."
                autoCapitalize="none"
                placeholderTextColor={colors.gray50}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.email && <Text style={styles.errorText}>
                {errors.email?.message}
              </Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha..."
                autoCapitalize="none"
                placeholderTextColor={colors.gray50}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={true}
              />
              {errors.password && <Text style={styles.errorText}>
                {errors.password?.message}
              </Text>}
            </View>
          )}
        />


        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Carregando..." : "Acessar conta"}
          </Text>
        </TouchableOpacity>

        <Link
          href="/(auth)/signup/page"
          style={styles.link}
        >
          Ainda não possui uma conta? Cadastre-se
        </Link>



      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: colors.zinc
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 34,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 4,
    marginBottom: 12,
    padding: 12,
  },
  button: {
    backgroundColor: colors.orange,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  link: {
    color: colors.white,
    marginTop: 16,
    textAlign: 'center'
  },
  errorText: {
    color: colors.red,
    marginBottom: 8,
  }
})