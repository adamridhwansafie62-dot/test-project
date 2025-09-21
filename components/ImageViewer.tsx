import React, { useRef } from 'react';
import Spinner from './Spinner';
import UploadIcon from './icons/UploadIcon';

interface UploaderBoxProps {
  imagePreview: string | null;
  onFileSelect: (file: File) => void;
  placeholderText: string;
}

const UploaderBox: React.FC<UploaderBoxProps> = ({ imagePreview, onFileSelect, placeholderText }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
     <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center relative overflow-hidden border-2 border-dashed border-white/40">
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
        />
        {!imagePreview && (
            <label
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-200 hover:text-white hover:bg-white/20 transition-colors duration-300 p-2 text-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadIcon className="w-10 h-10 mb-2" />
                <span className="font-semibold text-sm">{placeholderText}</span>
            </label>
        )}
        {imagePreview && (
            <img
                src={imagePreview}
                alt="Preview"
                className="object-contain w-full h-full"
            />
        )}
     </div>
  )
};


interface ImageViewerProps {
  editedImage: string | null;
  image1Preview: string | null;
  image2Preview: string | null;
  isLoading: boolean;
  onFileSelect: (index: 1 | 2, file: File) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  editedImage,
  image1Preview,
  image2Preview,
  isLoading,
  onFileSelect,
}) => {

  return (
    <div className="aspect-square bg-black/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {editedImage && !isLoading ? (
            <img
              src={editedImage}
              alt="Generated Result"
              className="object-contain w-full h-full"
            />
        ) : (
            <div className="w-full h-full p-4 flex items-center justify-center gap-4">
                <div className="w-2/5 max-w-[150px]">
                    <UploaderBox
                        imagePreview={image1Preview}
                        onFileSelect={(file) => onFileSelect(1, file)}
                        placeholderText="Upload First Image"
                    />
                </div>
                <div className="w-2/5 max-w-[150px]">
                    <UploaderBox
                        imagePreview={image2Preview}
                        onFileSelect={(file) => onFileSelect(2, file)}
                        placeholderText="Upload Second Image"
                    />
                </div>
            </div>
        )}
        
        {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm">
            <Spinner />
            <p className="mt-4 text-lg font-semibold animate-pulse">Creating magic...</p>
            </div>
        )}

        {!editedImage && !isLoading && (!image1Preview || !image2Preview) && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded-md text-center text-xs text-gray-200 backdrop-blur-sm">
                Upload two photos to create some magic!
            </div>
        )}

        {editedImage && !isLoading && (
             <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded-md text-center text-xs text-gray-200 backdrop-blur-sm">
                Voilà! Here is your masterpiece.
            </div>
        )}
    </div>
  );
};

export default ImageViewer;