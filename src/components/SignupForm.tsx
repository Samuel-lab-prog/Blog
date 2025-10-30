import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const schema = z.object({
  firstName: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 characters long')
    .max(30, 'Last name must be at most 30 characters long'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
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
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.statusCode === 409) {
          setError('email', { type: 'manual', message: 'Email already in use' });
        }
      } else {
        const responseData = await response.json().catch(() => ({}));
        console.log('Registration successful!', responseData);
        navigate('/signin');
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
        label="First Name"
        placeholder="Type your first name"
        error={errors.firstName}
        {...register('firstName')}
      />

      <Input
        label="Last Name"
        placeholder="Type your last name"
        error={errors.lastName}
        {...register('lastName')}
      />

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
        {isSubmitting ? 'Sending...' : 'Create Account'}
      </Button>
    </form>
  );
}
