// HOOK CUSTOMIZADO: Encapsular a lógica assim o container fica mais limpo
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '../config/supabase'
import { travelService } from '../services/travel-service'
import { router } from 'expo-router'


const travelSchema = z.object({
  title: z.string().nonempty("O nome da viagem é obrigatória").min(1, "O nome da viagem é obrigatório"),
  city: z.string().min(1, "A cidade / estado é obrigatória"),
  hotel_address: z.string().min(1, "O endereço do hotel é obrigatório"),
  start_date: z.string().min(1, "A data de partida é obrigatória"),
  end_date: z.string().min(1, "A data de volta é obrigatória"),
})

export type TravelFormData = z.infer<typeof travelSchema>;


const useCreateTravel = () => {

  const [userId, setUserId] = useState<null | string>(null)

  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TravelFormData>({
    resolver: zodResolver(travelSchema)
  })

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id ?? null)
    }


    fetchUser();
  }, [])


  const createNewTravel = async (data: TravelFormData) => {
    if (!userId) return;

    try {
      await travelService.createTravel(data, userId)
      reset();
      router.replace("/(panel)/home/page")

    } catch (err) {
      console.log("ERRO AO CADASTRAR VIAGEM: ");
      console.log(err);
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    createNewTravel
  }
}

export default useCreateTravel;
