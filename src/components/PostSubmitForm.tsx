import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import TextArea from './TextAreaInput';
import Button from './Button';

const schema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(30, 'Title must be at most 30 characters long'),
  content: z
    .string()
    .min(100, 'Content must be at least 100 characters long'),
  tags: z.array(
    z.string().min(2, 'Each tag must be at least 2 characters long')
  ),
  excerpt: z
    .string()
    .max(100, 'Excerpt must be at most 100 characters long'),
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          tags: data.tags,
          authorId: 1,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError('title', {
          type: 'server',
          message: errorData.errorMessages || 'Failed to create post',
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
      className="flex flex-col p-4 w-full max-w-xl gap-4"
    >
      <Input
        label="Title"
        placeholder="Type your post title"
        error={errors.title}
        {...register('title')}
      />
      <TextArea
        label="Excerpt"
        placeholder="Type your post excerpt"
        error={errors.excerpt}
        {...register('excerpt')}
      />
      <TextArea
        label="Content"
        placeholder="Type your post content"
        error={errors.content}
        rows={6}
        {...register('content')}
      />

      <Input
        label="Tags (comma separated)"
        placeholder="e.g. programming, react, cloud"
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
        {isSubmitting ? 'Sending...' : 'Create Post'}
      </Button>
    </form>
  );
}
