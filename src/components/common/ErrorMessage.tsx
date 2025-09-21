import React from 'react';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  error?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  error,
  onRetry,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center">
        <AlertCircle className="text-red-400 mr-3" size={24} />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-red-800">{message}</h3>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
        </div>
      </div>
      
      {onRetry && (
        <div className="mt-4">
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};