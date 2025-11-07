import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { marked } from 'marked';
import Input from './Input';
import TextArea from './TextAreaInput';
import Button from './Button';

const schema = z.object({
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(150, 'Título deve ter no máximo 150 caracteres'),
  content: z
    .string()
    .min(150, 'Conteúdo deve ter pelo menos 150 caracteres'),
  tags: z.array(
    z.string().min(3, 'Cada tag deve ter pelo menos 3 caracteres')
  ),
  excerpt: z
    .string()
});

export default function PostSubmitForm() {
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
      const response = await fetch('http://localhost:5000/posts', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          content: marked(data.content),
          excerpt: data.excerpt,
          tags: data.tags,
          authorId: 1,
        }),
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
        placeholder="Digite o título do seu post"
        error={errors.title}
        {...register('title')}
      />
      <TextArea
        label="Resumo"
        placeholder="Digite o resumo do seu post"
        error={errors.excerpt}
        {...register('excerpt')}
      />
      <TextArea
        label="Conteúdo"
        placeholder="Digite o conteúdo do seu post (Markdown suportado)"
        error={errors.content}
        rows={6}
        {...register('content')}
      />

      <Input
        label="Tags (separadas por vírgula)"
        placeholder="ex: programação, react, nuvem"
        error={
          errors.tags
            ? { type: 'manual', message: errors.tags[0]?.message }
            : undefined
        }
        {...register('tags', {
          setValueAs: (val: string) =>
            val
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean),
        })}
      />
      <Button
        type="submit"
        className="w-full"
        variant={isValid ? 'primary' : 'disabled'}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Criar Post'}
      </Button>
    </form>
  );
}
