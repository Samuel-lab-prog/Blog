import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';
import SearchInput from './SearchInput';

const schema = z.object({
  title: z
    .string()
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

  async function onSubmit({ title }: z.infer<typeof schema>) {
    try {
      const response = await fetch(`http://localhost:5000/posts/${title}`, {
        credentials: 'include',
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError('title', {
          type: 'server',
          message: errorData.errorMessages || 'Falha ao deletar post',
        });
        return;
      }

      alert(`Post #${title} deletado com sucesso!`);
    } catch (error) {
      console.error('Erro durante a exclusão:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 w-full">
      <SearchInput options={['React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Bun', 'Elysia']} placeholder="Digite o nome do post" />
      <Button
        type="submit"
        className="w-full"
        variant={isValid ? 'primary' : 'disabled'}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Deletando...' : 'Deletar Post'}
      </Button>
    </form>
  );
}
