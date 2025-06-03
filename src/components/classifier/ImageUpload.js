import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const ImageUpload = forwardRef(({ onUpload }, ref) => {
  const fileInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerFileSelect: () => {
      fileInputRef.current.click();
    }
  }));

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          onUpload(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    // Clear the input value so that selecting the same file again triggers onChange
    event.target.value = null;
  };

  return (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileUpload}
      accept="image/*"
      className="hidden"
    />
  );
});

export default ImageUpload;