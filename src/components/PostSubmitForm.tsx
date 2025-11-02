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
    .min(100, 'Content must be at least 100 characters long')
    .max(600, 'Content must be at most 600 characters long'),
  tags: z.array(z.string().min(2, 'Each tag must be at least 2 chars')),
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
    const fullData = {
      ...data,
      authorId: 1,
      status: 'published'
    }
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError('title', { type: 'server', message: errorData.errorMessages || 'Failed to create post' });
      } 
        const responseData = await response.json().catch(() => ({}));
        console.log('Post created successfully!', responseData);
      
    } catch (error) {
      console.error('Error during request:', error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-4 w-full max-w-xl"
    >
      <Input
        label="Title"
        placeholder="Type your post title"
        error={errors.title}
        {...register('title')}
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
        error={errors.tags ? { type: 'manual', message: errors.tags[0]?.message } : undefined}
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
