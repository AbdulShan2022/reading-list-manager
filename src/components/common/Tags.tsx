import React from 'react';

interface TagsProps {
  tags: string[];
  max?: number;
}
export const Tags: React.FC<TagsProps> = ({ tags = [], max = 3 }) => {
  if (!tags || tags.length === 0) {
    return <span className="text-sm text-gray-400 italic">No tags</span>;
  }

  const displayTags = tags.slice(0, max);
  const remaining = tags.length - max;

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && <span className="text-xs text-gray-500 ml-1">+{remaining} more</span>}
    </div>
  );
};
