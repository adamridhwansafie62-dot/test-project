import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageWorkspace from './components/ImageWorkspace';
import { editImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const defaultPrompt = `Buat dua orang tersebut seolah olah bertemu di sebuah gang perumahan jadul terdapat pohon mangga besar, buat viewnya dari samping yang menampilkan mereka berdua dari samping.
buat mereka berjarak berjauhan namun melihat ke satu sama lain.
buat seperti nuansa sore hari golden hour, buat mereka berdiri sejajar berhadapan dan pandangan si anak sedikit keatas melihat orang itu.`;

const App: React.FC = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleFileSelect = (index: 1 | 2, file: File) => {
    setEditedImage(null);
    if (index === 1) {
      setFile1(file);
    } else {
      setFile2(file);
    }
  };

  const handleCombine = useCallback(async () => {
    if (!file1 || !file2) {
      setError('Please upload two images.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponseText(null);

    try {
      const file1Data = await fileToBase64(file1);
      const file2Data = await fileToBase64(file2);
      const result = await editImage(
        file1Data.base64,
        file1Data.mimeType,
        file2Data.base64,
        file2Data.mimeType,
        defaultPrompt
      );
      
      if (result.newImage) {
        setEditedImage(`data:image/png;base64,${result.newImage}`);
      }
      if (result.text) {
        setResponseText(result.text);
      }
      if (!result.newImage && !result.text) {
        setError("The AI didn't return an image or text. Try different images.");
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [file1, file2]);

  const handleReset = () => {
    setFile1(null);
    setFile2(null);
    setEditedImage(null);
    setIsLoading(false);
    setError(null);
    setResponseText(null);
  };

  const image1Preview = file1 ? URL.createObjectURL(file1) : null;
  const image2Preview = file2 ? URL.createObjectURL(file2) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <ImageWorkspace
          image1Preview={image1Preview}
          image2Preview={image2Preview}
          editedImage={editedImage}
          isLoading={isLoading}
          error={error}
          onFileSelect={handleFileSelect}
          onEdit={handleCombine}
          onReset={handleReset}
          responseText={responseText}
        />
      </main>
    </div>
  );
};

export default App;