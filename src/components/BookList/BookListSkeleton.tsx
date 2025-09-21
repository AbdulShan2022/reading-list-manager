import React from 'react';

export const BookListSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/5 mr-4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-8"></div>
      </div>
      <div className='space-y-4'>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="flex items-center p-4 border border-gray-200 rounded-lg animate-pulse bg-white"
        >
          <div className="flex-1 space-y-3">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            
            {/* Author skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            
            {/* Rating and tags skeleton */}
            <div className="flex gap-4 items-center">
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
                <div className="w-8 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="ml-4">
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};