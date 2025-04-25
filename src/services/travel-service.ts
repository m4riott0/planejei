import { supabase } from '../config/supabase'

export type CreateTravelPayload = {
  title: string;
  city: string;
  hotel_address: string;
  start_date: string;
  end_date: string;
}

export type Travel = {
  id: string;
  title: string;
  city: string;
  user_id: string;
  hotel_address: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export const travelService = {

  createTravel: async (payload: CreateTravelPayload, user_id: string) => {
    const { data, error } = await supabase.from("travels").insert([
      {
        ...payload,
        user_id: user_id,
      }
    ]);

    if (error) {
      throw error;
    }

    return data;

  },

  getTravels: async (user_id: string): Promise<Travel[]> => {

    const today = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD

    const { data, error } = await supabase
      .from("travels")
      .select("*")
      .eq("user_id", user_id)
      .gte("end_date", today)
      .order("start_date", { ascending: true })


    if (error) throw error;

    return data;

  },

  getTravelById: async (travel_id: string): Promise<Travel> => {
    const { data, error } = await supabase
      .from("travels")
      .select("*")
      .eq("id", travel_id)
      .single();

    if (error) throw error;

    return data;

  },

  deleteTravelById: async (travel_id: string) => {
    const { error } = await supabase.from("travels").delete().eq("id", travel_id)
    if (error) throw error;
  }


}
