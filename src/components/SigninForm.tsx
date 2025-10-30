import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const schema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
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
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.statusCode === 401 || errorData.statusCode === 404) {
          setError('email', { type: 'manual', message: 'Email or password is invalid' });
          setError('password', { type: 'manual', message: 'Email or password is invalid' });
        }
      } else {
        const responseData = await response.json().catch(() => ({}));
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
      className="max-w-sm mx-auto flex flex-col p-4 w-4/5"
    >
      <Input
        label="Email"
        type="email"
        placeholder="Type your email"
        error={errors.email}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Type your password"
        error={errors.password}
        {...register('password')}
      />

      <Button
        type="submit"
        className="w-full"
        variant={isValid ? 'primary' : 'disabled'}
      >
        {isSubmitting ? 'Sending...' : 'Sign In'}
      </Button>
    </form>
  );
}
