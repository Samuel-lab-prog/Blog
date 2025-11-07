import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';

const schema = z.object({
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(150, 'Título deve ter no máximo 150 caracteres'),
});

export default function PostDeleteForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const response = await fetch(`http://localhost:5000/posts/${data.title}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError('title', {
          type: 'server',
          message: errorData.errorMessages || 'Falha ao criar post',
        });
        return;
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-4 w-full"
    >
      <Input
        label="Título"
        placeholder="Digite o título do post "
        error={errors.title}
        {...register('title')}
      />
      <Button
        type="submit"
        className="w-full"
        variant={isValid ? 'primary' : 'disabled'}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Deletar Post'}
      </Button>
    </form>
  );
}
