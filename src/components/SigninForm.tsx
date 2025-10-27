import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';

const schema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', 
  });

  function onSubmit(data: z.infer<typeof schema>) {
    console.log('Dados enviados:', data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto flex flex-col p-4 w-4/5"
    >
      <Input
        label="Email"
        type="email"
        placeholder="Digite seu email"
        error={errors.email}
        {...register('email')}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        error={errors.password}
        {...register('password')}
      />

      <Button
        type="submit"
        className="w-full"
        variant={isValid ? 'primary' : 'disabled'}
      >
        {isSubmitting ? 'Enviando...' : 'Criar Conta'}
      </Button>
    </form>
  );
}
