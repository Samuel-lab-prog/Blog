import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { marked } from 'marked';
import Input from '../Input';
import TextArea from '../TextAreaInput';
import Button from '../Button';

const API_URL = import.meta.env.VITE_API_URL;

const schema = z.object({
  oldTitle: z.string().min(1, 'Título atual é obrigatório'),
  title: z.string().optional(),
  excerpt: z
    .string()
    .max(150, 'Resumo deve ter no máximo 150 caracteres')
    .optional(),
  content: z
    .string()
    .optional(),
  tags: z.array(z.string()).optional(),
});

export default function PostUpdateForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  function removeEmptyFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    const keys = Object.keys(obj) as (keyof T)[];
    for (const key of keys) {
      const value = obj[key];
      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === 'string' && value.trim() === '') &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        cleaned[key] = value;
      }
    }
    return cleaned;
  }

  async function onSubmit(data: z.infer<typeof schema>) {
    const { oldTitle, ...updates } = data;

    const cleanedUpdates = removeEmptyFields(updates);

    if (cleanedUpdates.content) {
      cleanedUpdates.content = await marked(String(cleanedUpdates.content));
    }

    try {
      const response = await fetch(`${API_URL}/posts/${oldTitle}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedUpdates),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError('oldTitle', {
          type: 'server',
          message: errorData.errorMessages || 'Falha ao atualizar post',
        });
        return;
      }
    } catch (error) {
      console.error('Erro durante atualização:', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-4 w-full"
    >
      <>
        <Input
          label="Título atual (obrigatório)"
          placeholder="Título atual do post"
          error={errors.oldTitle}
          {...register('oldTitle')}
        />

        <Input
          label="Novo título (opcional)"
          placeholder="Novo título — deixe vazio para manter o mesmo"
          error={errors.title}
          {...register('title')}
        />

        <TextArea
          label="Resumo (opcional)"
          placeholder="Novo resumo"
          error={errors.excerpt}
          {...register('excerpt')}
        />

        <TextArea
          label="Conteúdo (opcional)"
          placeholder="Novo conteúdo (Markdown suportado)"
          error={errors.content}
          rows={6}
          {...register('content')}
        />

        <Input
          label="Tags (separadas por vírgula, opcional)"
          placeholder="ex: react, banco, performance"
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

        <Button type="submit" className="w-full">
          {isSubmitting ? 'Atualizando...' : 'Atualizar Post'}
        </Button>
      </>
    </form>
  );
}
