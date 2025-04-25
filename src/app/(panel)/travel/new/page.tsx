// NewTravelContainer // Consome os hooks, services e repassa para as screens...
import useCreateTravel from "../../../../hooks/useCreateTravel";
import { NewTravelScreen } from "@/src/screens/travel/new";

export default function NewTravel() {

  const { control, createNewTravel, errors, handleSubmit, isSubmitting } = useCreateTravel();

  return (
    <NewTravelScreen
      control={control}
      createNewTravel={createNewTravel}
      errors={errors}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}