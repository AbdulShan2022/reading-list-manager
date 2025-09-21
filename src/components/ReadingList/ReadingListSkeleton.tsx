import React from 'react';

export const ReadingListSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mr-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-8"></div>
      </div>
      {/* Reading list items skeleton */}
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4"
          >
            {/* Book title and author skeleton */}
            <div className="mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            {/* Rating and tags skeleton */}
            <div className="flex items-center gap-4 mb-4">
              {/* Rating skeleton */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <div
                    key={starIndex}
                    className="w-4 h-4 bg-gray-200 rounded"
                  ></div>
                ))}
                <div className="w-8 h-4 bg-gray-200 rounded ml-2"></div>
              </div>
              
              {/* Tags skeleton */}
              <div className="flex gap-1">
                <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Notes textarea skeleton */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-32 mt-1"></div>
            </div>

            {/* Delete button skeleton */}
            <div className="flex justify-end mt-4">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};