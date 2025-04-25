import { authService } from '../services/auth-service'
import {
  useForm
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'


const signInSchema = z.object({
  email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
  password: z.string().min(1, "A Senha é obrigatória."),
})


export type SignInFormData = z.infer<typeof signInSchema>


const useSigin = () => {

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })


  const onSubmit = async (data: SignInFormData) => {
    try {
      await authService.signIn(data.email, data.password);
      router.replace("/(panel)/home/page")

    } catch (err) {
      console.log("FALHA AO LOGAR USUARIO")
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

export default useSigin;