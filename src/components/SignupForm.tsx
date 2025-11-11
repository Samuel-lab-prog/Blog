import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const API_URL = import.meta.env.VITE_API_URL;
const schema = z.object({
  firstName: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(30, 'Nome deve ter no máximo 30 caracteres'),
  lastName: z
    .string()
    .min(3, 'Sobrenome deve ter pelo menos 3 caracteres')
    .max(30, 'Sobrenome deve ter no máximo 30 caracteres'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export default function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const response = await fetch(
        `${API_URL}/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.statusCode === 409) {
          setError('email', {
            type: 'manual',
            message: 'Email já está em uso',
          });
        }
        else {
          setError('email', {
            type: 'manual',
            message: 'Erro interno do servidor. Tente novamente mais tarde.',
          });
        }
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col my-4 w-full"
    >
      <Input
        label="Primeiro Nome"
        placeholder="Digite seu primeiro nome"
        error={errors.firstName}
        {...register('firstName')}
      />

      <Input
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        error={errors.lastName}
        {...register('lastName')}
      />

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
