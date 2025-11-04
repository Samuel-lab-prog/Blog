import PostSubmitForm from '../components/PostSubmitForm';

export default function PostSubmitPage() {
  return (
    <main className="absolute px-4 w-full left-0 top-20 flex flex-col items-center">
      <h2 className="text-gray-900 text-center mt-8">
        Create a New Post
      </h2>
      <PostSubmitForm />
    </main>
  );
}
