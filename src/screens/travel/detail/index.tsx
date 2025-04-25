import colors from "@/src/constants/colors";
import { Reminder } from "@/src/services/reminders-service";
import { Travel } from "@/src/services/travel-service";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Link } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";

interface TravelDetailScreenProps {
  loading: boolean;
  travel: Travel | null;
  handleDeleteTravel: () => Promise<void>;
  remindersHook: {
    loading: boolean;
    newReminder: string;
    setNewReminder: React.Dispatch<React.SetStateAction<string>>;
    addReminder: () => Promise<void>;
    reminders: Reminder[];
    deleteReminder: (reminder_id: string) => Promise<void>;
  }
}


export function TravelDetailScreen({
  loading,
  travel,
  handleDeleteTravel,
  remindersHook,
}: TravelDetailScreenProps) {

  if (loading || !travel) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    )
  }

  const formattedStartDate = format(parseISO(travel?.start_date), "dd MMMM yyyy", { locale: ptBR })
  const formattedEndDate = format(parseISO(travel?.end_date), "dd MMMM yyyy", { locale: ptBR })

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.row}>
          <Link href="/(panel)/home/page">
            <Feather name="arrow-left" size={40} color={colors.white} />
          </Link>

          <Text style={styles.title}>Planejei</Text>
        </View>

        <View>
          <Text style={[styles.heading, { marginTop: 14, }]}>
            Detalhes da sua viagem para
          </Text>
          <Text style={[styles.heading, { fontWeight: '600', marginBottom: 14, }]}>
            {travel?.city}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.infoRow, { marginBottom: 8 }]}>
            <MaterialCommunityIcons name="airplane-takeoff" size={24} color={colors.white} />
            <Text style={styles.date}>
              {formattedStartDate}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="airplane-landing" size={24} color={colors.white} />
            <Text style={styles.date}>
              {formattedEndDate}
            </Text>
          </View>


          <View style={styles.card}>
            <Text style={styles.label}>Cidade:</Text>
            <Text style={styles.value}>{travel?.city}</Text>

            <Text style={styles.label}>Endereço hotel:</Text>
            <Text style={styles.value}>{travel?.hotel_address}</Text>

            <Pressable
              style={styles.deleteButton}
              onPress={async () => await handleDeleteTravel()}
            >
              <Text style={styles.deleteButtonText}>
                Excluir viagem
              </Text>
            </Pressable>
          </View>


          <Text style={styles.sectionTitle}>
            Lembretes
          </Text>

          <View style={styles.reminderInputContainer}>
            <TextInput
              placeholder="Digite um lembrete..."
              style={styles.reminderInput}
              placeholderTextColor={colors.gray100}
              value={remindersHook.newReminder}
              onChangeText={(value) => remindersHook.setNewReminder(value)}
            />

            <Pressable
              style={styles.addButton}
              onPress={async () => await remindersHook.addReminder()}
            >
              <Text style={{ color: colors.white }}>+</Text>
            </Pressable>
          </View>

          <View style={styles.spacingVertical}>

            {remindersHook.reminders.map((item) => (
              <View style={styles.reminderItem} key={item.id}>
                <Text style={styles.reminderText}>
                  {item.description}
                </Text>

                <Pressable
                  onPress={async () => await remindersHook.deleteReminder(item.id)}
                >
                  <Feather name="trash" size={20} color={colors.red} />
                </Pressable>
              </View>
            ))}

          </View>


        </ScrollView>


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  heading: {
    color: colors.white,
    fontSize: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 8
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  label: {
    color: colors.zinc,
    marginBottom: 4,
  },
  value: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.red,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButtonText: {
    color: colors.red,
    fontWeight: '500',
  },

  // STYLES DOS LEMBRETES:
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  reminderInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray200,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
  reminderInput: {
    flex: 1,
    color: colors.white,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: colors.orange,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4
  },
  spacingVertical: {
    marginBottom: 14,
  },
  reminderItem: {
    backgroundColor: colors.gray200,
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  reminderText: {
    color: colors.white,
    flex: 1,
  }
})