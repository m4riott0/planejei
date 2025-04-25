import useDetailTravel from "@/src/hooks/useDetailTravel";
import useReminders from "@/src/hooks/useReminders";
import { TravelDetailScreen } from "@/src/screens/travel/detail";

export default function DetailTravel() {
  const { loading, travel, handleDeleteTravel } = useDetailTravel();
  const remindersHook = useReminders();

  return (
    <TravelDetailScreen
      loading={loading}
      travel={travel}
      handleDeleteTravel={handleDeleteTravel}
      remindersHook={remindersHook}
    />
  )
}