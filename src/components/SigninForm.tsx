import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
const API_URL = import.meta.env.VITE_API_URL;

const schema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export default function SigninForm() {
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
        `${API_URL}/users/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if (
          errorData.statusCode === 401 ||
          errorData.statusCode === 404
        ) {
          setError('email', {
            type: 'manual',
            message: 'Email ou senha inválidos',
          });
          setError('password', {
            type: 'manual',
            message: 'Email ou senha inválidos',
          });
        }
      } else {
        const responseData = await response.json();
        localStorage.setItem('user', JSON.stringify(responseData));
        navigate('/');
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
        {isSubmitting ? 'Enviando...' : 'Entrar'}
      </Button>
    </form>
  );
}
