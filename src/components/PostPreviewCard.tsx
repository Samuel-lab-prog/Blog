import Button from './Button';

type PostPreviewCardProps = {
  title: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  postUrl: string;
  className?: string;
};
export default function PostPreviewCard({ title, excerpt, tags, imageUrl, postUrl, className }: PostPreviewCardProps) {
  return (
    <div className={`rounded overflow-hidden shadow-lg ${className}`}>
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4 relative h-50">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-gray-700 mb-2">{excerpt}</p>
        <div className="w-1/2">
        {tags.map((tag) => (
          <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 font-semibold text-gray-700 mr-1 border mb-1 border-gray-400">
            {tag}
          </span>
        ))}
        </div>
        <Button onClick={() => window.location.href = postUrl} className="absolute bottom-4 right-4">
          Read more
        </Button>
      </div>
    </div>
  )
}