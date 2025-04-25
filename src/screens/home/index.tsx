import colors from "@/src/constants/colors";
import { Link, useRouter } from "expo-router";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Feather } from '@expo/vector-icons'
import { Travel } from "@/src/services/travel-service";
import {
  format,
  parseISO,
  isBefore,
  endOfDay,
  differenceInCalendarDays,
  isWithinInterval
} from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR'

interface HomeScreenProps {
  loading: boolean;
  travels: Travel[];
}

export function HomeScreen({ travels, loading }: HomeScreenProps) {
  const router = useRouter();
  const [nextTravel, ...otherTravels] = travels;


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    )
  }

  let statusMessage = "";

  if (nextTravel) {
    const today = new Date();
    const startDate = parseISO(nextTravel.start_date);
    const endDate = parseISO(nextTravel.end_date);

    if (isBefore(today, startDate)) {
      const daysLeft = differenceInCalendarDays(startDate, today)
      statusMessage = `Faltam ${daysLeft} dias para sua viagem`;
    } else if (
      isWithinInterval(today, { start: startDate, end: endDate })
    ) {
      statusMessage = "Sua viagem está em andamento";
    }
  }

  const formatDateRange = (start: string, end: string) => {
    const formatStartDate = format(parseISO(start), "dd MMMM", { locale: ptBR });
    const formatEndDate = format(parseISO(end), "dd MMMM yyyy", { locale: ptBR });

    return `${formatStartDate} até ${formatEndDate}`;
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.zinc} barStyle="light-content" />

        <View style={styles.row}>
          <Text style={styles.title}>Planejei</Text>

          <View style={styles.contentLinks}>
            <Link
              href="/(panel)/profile/page"
              style={styles.buttonAdd}
            >
              <Feather name="home" size={30} color={colors.white} />
            </Link>

            <Link
              href="/(panel)/travel/new/page"
              style={[styles.buttonAdd, { backgroundColor: colors.orange }]}
            >
              <Feather name="plus" size={30} color={colors.white} />
            </Link>
          </View>

        </View>


        {travels && travels.length === 0 && (
          <Text style={styles.warningTravel}>
            Nenhuma viagem cadastrada...
          </Text>
        )}


        {/* CARD VIAGEM DESTAQUE */}
        {nextTravel && (
          <View style={styles.highlightCard}>
            <Text style={styles.highlightText}>
              {statusMessage}
            </Text>

            <Text style={styles.rangeText}>
              {formatDateRange(nextTravel.start_date, nextTravel.end_date)}
            </Text>

            <Text style={styles.highlightCity}>
              {nextTravel.city}
            </Text>

            <TouchableOpacity
              style={styles.highlightButton}
              activeOpacity={1}
              onPress={() => router.push(`/(panel)/detail/${nextTravel.id}`)}
            >
              <Text style={styles.highlightButtonText}>
                Acessar viagem
              </Text>
            </TouchableOpacity>
          </View>
        )}


        {otherTravels.length > 0 && (
          <>
            <Text style={styles.subtitle}>Próximas viagens:</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={otherTravels}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTextRange}>
                    {formatDateRange(item.start_date, item.end_date)}
                  </Text>

                  <Text style={styles.city}>
                    {item.city}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.cardButton}
                    onPress={() => router.push(`/(panel)/detail/${item.id}`)}
                  >
                    <Text style={styles.cardButtonText}>
                      Aceessar detalhes
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.zinc,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.orange,
    fontSize: 30,
    fontWeight: '600'
  },
  contentLinks: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd: {
    borderRadius: 99,
    padding: 8,
  },
  highlightCard: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  highlightText: {
    color: colors.zinc,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  rangeText: {
    color: colors.gray,
  },
  highlightCity: {
    color: colors.zinc,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 14,
  },
  highlightButton: {
    backgroundColor: colors.orange,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlightButtonText: {
    color: colors.white,
    fontWeight: '500'
  },
  subtitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.gray200,
    padding: 20,
    borderRadius: 8,
    marginBottom: 14,
  },
  cardTextRange: {
    color: colors.white,
    marginBottom: 8,
  },
  city: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
    marginBottom: 14,
  },
  cardButton: {
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardButtonText: {
    color: colors.zinc,
    fontWeight: '500'
  },
  warningTravel: {
    color: colors.gray100
  }
})