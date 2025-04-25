import { authService } from '../services/auth-service'
import {
  useForm
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'


const signUpSchema = z.object({
  username: z.string().min(1, "O nome de usuário é obrigatório"),
  email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
  confirmPassword: z.string().nonempty("Confirmação da senha é obrigatória")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas devem ser iguais",
  path: ["confirmPassword"]
})


export type SignUpFormData = z.infer<typeof signUpSchema>


const useSignup = () => {

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })


  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authService.signUp(data.email, data.password, data.username);

      router.replace("/(panel)/home/page")
    } catch (err) {
      console.log("FALHA AO CRIAR USUARIO")
      console.log(err);
    }
  }


  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
  }

}

export default useSignup;