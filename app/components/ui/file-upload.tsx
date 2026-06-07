"use client";

import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  const handleUploadSuccess = (result: any) => {
    onChange(result.info.secure_url);
    toast.success('File uploaded successfully', {
      description: 'Your file has been uploaded to the cloud',
    });
  };

  const handleRemove = () => {
    onChange('');
  };

  const fileName = value ? value.split('/').pop() : null;

  return (
    <div className={className}>
      {value ? (
        <div className="relative flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-green/10">
            <FileText className="w-6 h-6 text-brand-green" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {fileName || 'CV File'}
            </p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-green hover:underline"
            >
              View file
            </a>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg shrink-0"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'}
          onSuccess={handleUploadSuccess}
          options={{
            maxFiles: 1,
            resourceType: 'raw',
            clientAllowedFormats: ['pdf'],
            maxFileSize: 10000000, // 10MB
            sources: ['local', 'url'],
            multiple: false,
            styles: {
              palette: {
                window: '#ffffff',
                sourceBg: '#f4f4f5',
                windowBorder: '#90a4ae',
                tabIcon: '#10b981',
                inactiveTabIcon: '#555a5f',
                menuIcons: '#555a5f',
                link: '#10b981',
                action: '#339933',
                inProgress: '#10b981',
                complete: '#339933',
                error: '#cc0000',
                textDark: '#000000',
                textLight: '#fcfffd'
              }
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={disabled}
              className={`
                w-full border-2 border-dashed rounded-lg p-8 text-center transition-all
                ${disabled
                  ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-600'
                  : 'cursor-pointer border-gray-300 dark:border-gray-600 hover:border-brand-green dark:hover:border-brand-green'
                }
              `}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Click to upload CV/Resume
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF only (max 10MB)
                  </p>
                </div>
              </div>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default FileUpload;
