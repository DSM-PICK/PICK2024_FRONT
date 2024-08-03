import React, { useState, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (images: File[]) => void;
}

const ImgModal: React.FC<ModalProps> = ({ isOpen, onClose, onClick }) => {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const pasteDivRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = Array.from(e.clipboardData.items);
    const pastedFiles = items
      .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (pastedFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...pastedFiles]);
    }

    if (pasteDivRef.current) {
      pasteDivRef.current.innerHTML = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onCancle = () => {
    onClose();
    setImages([]);
  };

  const AddImg = () => {
    onClick(images);
    setImages([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col items-end">
        <button className=" text-2xl mb-3" onClick={onClose}>
          &times;
        </button>
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 w-full flex flex-col items-center bg-gray-200 ${
            dragActive ? "bg-gray-300" : ""
          }`}
          htmlFor="imgUpload"
        >
          <div className="text-4xl mb-4">&#128247;</div>
          <span className="whitespace-nowrap">
            이미지를 끌어오거나 업로드 할 파일을 선택해 주세요
          </span>
          <input
            type="file"
            id="imgUpload"
            className="hidden"
            onChange={handleChange}
            multiple
          />
        </label>
        <div className="my-4 relative w-full text-center">
          <span className="bg-white px-2 absolute -top-3 z-10 left-44 text-gray-300 ">
            또는
          </span>
          <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300 transform -translate-y-1/2"></div>
        </div>
        <div
          ref={pasteDivRef}
          contentEditable="true"
          onPaste={handlePaste}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
        >
          이미지를 붙여넣기 해주세요.
        </div>
        <div className="my-4 w-full grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index}`}
                className="min-w-full min-h-full rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full px-2 py-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-gray-300 text-white py-2 px-4 rounded-lg"
            onClick={onCancle}
          >
            취소
          </button>
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-lg"
            onClick={AddImg}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgModal;
