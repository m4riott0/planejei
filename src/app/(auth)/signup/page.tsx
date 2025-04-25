import { SignUpScreen } from "@/src/screens/signup";
import useSignup from '../../../hooks/useSignup'

export default function SignUp() {
  const { control, handleSubmit, onSubmit, isSubmitting, errors } = useSignup();


  return (
    <SignUpScreen
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      errors={errors}
    />
  )
}