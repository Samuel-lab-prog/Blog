import Button from './Button';

type PostPreviewCardProps = {
  title: string;
  excerpt: string;
  tags: string[];
  postUrl: string;
};

export default function PostPreviewCard({
  title,
  excerpt,
  tags,
  postUrl,
}: PostPreviewCardProps) {
  return (
    <div className="flex flex-col align-end p-4 border rounded-md shadow-sm h-60 relative">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-gray-700 mb-2 wrap-break-word">{excerpt}</p>
      <div className="flex flex-wrap mb-4">
        {tags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-block bg-gray-200 rounded-full px-2 py-1 font-semibold text-gray-700 mr-1 mb-1 border border-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button
        to={postUrl}
        className="absolute bottom-4 right-4"
        variant="primary"
      >
        Ler mais
      </Button>
    </div>
  );
}
