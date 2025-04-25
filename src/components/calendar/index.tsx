import colors from "@/src/constants/colors";
import { useState } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Calendar } from 'react-native-calendars'

interface DatePickerInputProps {
  label: string;
  minDate?: string;
  value: string;
  onChange: (date: string) => void;
}

export function DatePickerInput({ label, minDate, value, onChange }: DatePickerInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleDayPress(day: { dateString: string }) {
    onChange(day.dateString)
    setModalVisible(false);
  }


  return (
    <View style={styles.safeArea}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={{ color: value ? colors.orange : colors.gray50 }}>
          {value ? new Intl.DateTimeFormat("pt-BR").format(new Date(value)) : "Selecione uma data..."}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={handleDayPress}
              minDate={minDate ?? new Date().toISOString().split("T")[0]}
              markedDates={
                value ? {
                  [value]: {
                    selected: true,
                    selectedColor: colors.orange,
                    marked: true,
                  }
                } : {}
              }
            />

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ fontWeight: '500', color: colors.red }}>Cancelar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    marginBottom: 16
  },
  label: {
    color: colors.white,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 4,
    justifyContent: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
  },
  closeButton: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center'
  }
})