import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from 'react'
import { Reminder, remindersService } from '../services/reminders-service'

const useReminders = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [loading, setLoading] = useState(true);
  const [newReminder, setNewReminder] = useState("")
  const [reminders, setReminders] = useState<Reminder[]>([])


  const fetchReminders = async (tarvel_id: string) => {
    setLoading(true);

    try {

      const data = await remindersService.getReminders(tarvel_id)
      setReminders(data)
      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.log("ERRO AO BUSCAR LEMBRETES: ", err)
    }
  }


  const addReminder = async () => {
    if (!newReminder.trim()) return;

    try {
      await remindersService.create({
        travel_id: id,
        description: newReminder
      })

      setNewReminder("")
      await fetchReminders(id);

    } catch (err) {
      console.log("ERRO AO CADASTRAR LEMBRETE: ", err)
    }
  }

  const deleteReminder = async (reminder_id: string) => {
    try {
      if (!reminder_id) return;

      await remindersService.delete(reminder_id)
      await fetchReminders(id);

    } catch (err) {
      console.log("ERRO AO DELETAR LEMBRETE:", err)
    }
  }


  useEffect(() => {

    if (!id) return;

    fetchReminders(id);

  }, [id])

  return {
    loading,
    newReminder,
    setNewReminder,
    addReminder,
    reminders,
    deleteReminder
  }
}

export default useReminders;