import useSigin from "@/src/hooks/useSignin";
import { SignInScreen } from "../../../screens/signin/index";

export default function SignIn() {
  const { control, errors, handleSubmit, isSubmitting, onSubmit } = useSigin()

  return (
    <SignInScreen
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  )
}