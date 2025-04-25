import { useState, useEffect } from 'react'
import { useLocalSearchParams, router } from "expo-router";
import { Travel, travelService } from '../services/travel-service';
import { Alert } from 'react-native'

const useDetailTravel = () => {
  const [travel, setTravel] = useState<null | Travel>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await travelService.getTravelById(id)
        setTravel(data);
        setLoading(false);

      } catch (err) {
        console.log("ERRO AO BUSCAR DETALHE: ", err)
        setLoading(false);
      }
    }

    fetchData();

  }, [id])


  const onDelete = async () => {
    try {
      await travelService.deleteTravelById(id)
      router.replace("/(panel)/home/page")
    } catch (err) {
      console.log("ERRO AO DELETAR: ", err)
    }
  }

  const handleDeleteTravel = async () => {
    Alert.alert(
      "Excluir viagem!",
      "Deseja realmente excluir essa viagem?",
      [
        { text: "Não", style: "cancel" },
        { text: "Excluir", onPress: async () => await onDelete() }
      ]
    )
  }

  return {
    travel,
    loading,
    handleDeleteTravel
  }
}

export default useDetailTravel;