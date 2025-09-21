import React from 'react';
import ImageViewer from './ImageViewer';
import EditorControls from './EditorControls';

interface ImageWorkspaceProps {
  image1Preview: string | null;
  image2Preview:string | null;
  editedImage: string | null;
  isLoading: boolean;
  error: string | null;
  onFileSelect: (index: 1 | 2, file: File) => void;
  onEdit: () => void;
  onReset: () => void;
  responseText: string | null;
}

const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({
  image1Preview,
  image2Preview,
  editedImage,
  isLoading,
  error,
  onFileSelect,
  onEdit,
  onReset,
  responseText,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
      <div className="flex flex-col items-center gap-8">
        <ImageViewer
          editedImage={editedImage}
          image1Preview={image1Preview}
          image2Preview={image2Preview}
          isLoading={isLoading}
          onFileSelect={onFileSelect}
        />
        <EditorControls
          onEdit={onEdit}
          onReset={onReset}
          isLoading={isLoading}
          hasImage1={!!image1Preview}
          hasImage2={!!image2Preview}
          error={error}
          responseText={responseText}
        />
      </div>
    </div>
  );
};

export default ImageWorkspace;
