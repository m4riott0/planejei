import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase';
import { Travel, travelService } from '../services/travel-service'



const useTravelList = () => {
  const [travels, setTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<null | string>(null)

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) return;
      setUserId(user.id);

      try {
        const data = await travelService.getTravels(user.id)

        setTravels(data)

        setLoading(false);

      } catch (err) {
        console.log("FALHA AO BUSCAR DADOS DAS VIAGENS: ", err)
        setLoading(false);
      }

    }

    fetchData();

  }, [])


  return {
    travels,
    loading
  }
}

export default useTravelList;