import { Link } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ScrollView, Platform, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "@/src/constants/colors";
import { Control, FieldErrors, UseFormHandleSubmit, Controller, useWatch } from "react-hook-form";
import { TravelFormData } from "@/src/hooks/useCreateTravel";
import { DatePickerInput } from "@/src/components/calendar";

interface NewTravelScreenProps {
  control: Control<TravelFormData>;
  handleSubmit: UseFormHandleSubmit<TravelFormData>;
  errors: FieldErrors<TravelFormData>;
  isSubmitting: boolean;
  createNewTravel: (data: TravelFormData) => Promise<void>;
}

export function NewTravelScreen({ control, createNewTravel, errors, handleSubmit, isSubmitting }: NewTravelScreenProps) {

  const startDate = useWatch({
    control,
    name: "start_date"
  })


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        <View style={styles.row}>
          <Link href="/(panel)/home/page">
            <Feather name="arrow-left" size={40} color={colors.white} />
          </Link>

          <Text style={styles.title}>Planejei</Text>
        </View>

        <Text style={styles.subTitle}>
          Vamos cadastrar sua próxima viagem
        </Text>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>
                Objetivo da viagem
              </Text>
              <TextInput
                placeholder="Digite o titulo da viagem..."
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholderTextColor={colors.gray50}
                style={styles.input}
              />

              {errors.title && <Text style={styles.labelError}>{errors.title?.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>
                Cidade e estado
              </Text>
              <TextInput
                placeholder="Digite a cidade e o estado..."
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholderTextColor={colors.gray50}
                style={styles.input}
              />

              {errors.city && <Text style={styles.labelError}>{errors.city?.message}</Text>}
            </View>
          )}
        />


        <Text style={styles.categoryDescription}>Detalhes da viagem</Text>

        <Controller
          control={control}
          name="hotel_address"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>
                Endereço do hotel
              </Text>
              <TextInput
                placeholder="Digite o endereço do hotel..."
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholderTextColor={colors.gray50}
                style={styles.input}
              />

              {errors.hotel_address && <Text style={styles.labelError}>
                {errors.hotel_address?.message}
              </Text>}
            </View>
          )}
        />


        <Controller
          control={control}
          name="start_date"
          render={({ field: { onChange, value } }) => (
            <>
              <DatePickerInput
                label="Selecione a data de ida"
                value={value}
                onChange={onChange}
              />

              {errors.start_date && <Text style={styles.labelError}>{errors.start_date?.message}</Text>}
            </>
          )}
        />


        {startDate && (
          <Controller
            control={control}
            name="end_date"
            render={({ field: { onChange, value } }) => (
              <>
                <DatePickerInput
                  label="Selecione a data de volta"
                  value={value}
                  onChange={onChange}
                  minDate={startDate} // Não permite selecionar a volta antes do dia de partida..
                />

                {errors.end_date && <Text style={styles.labelError}>{errors.end_date?.message}</Text>}
              </>
            )}
          />
        )}


        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(createNewTravel)}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Carregando..." : "Cadastrar viagem"}
          </Text>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.zinc,
    padding: Platform.OS === 'ios' ? 16 : 0
  },
  container: {
    padding: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    fontWeight: '600'
  },
  subTitle: {
    fontSize: 28,
    marginTop: 14,
    marginBottom: 14,
    color: colors.white,
    fontWeight: '500'
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 4,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    color: colors.white,
    marginBottom: 4,
    fontWeight: '500'
  },
  categoryDescription: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: colors.orange,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600'
  },
  labelError: {
    color: colors.red,
    marginTop: 4,
  }

})