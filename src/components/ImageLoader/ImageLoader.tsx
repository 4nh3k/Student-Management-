import React, { useRef, useState } from 'react';

import { PencilSimple, UploadSimple } from '@phosphor-icons/react';
import { FileDrop } from 'react-file-drop';
const ImageLoader = () => {
  const fileInputRef = useRef<File | null>(null);
  const [file, setFile] = useState(null); // array of currently uploaded files
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    // setFile(files[0]);
    // do something with your files...
  };
  const onFileDrop = (files, event) => {
    console.log('onFileDrop!', files, event);
    setFile(files[0]);
    // do something with your files...
  };

  const onTargetClick = () => {
    console.log('onTargetClick');

    fileInputRef?.current.click();
  };
  return (
    <FileDrop
      className='m-auto block cursor-pointer rounded-full lg:h-48 lg:w-48'
      targetClassName={`w-48 h-48 border-2 mx-auto ${
        file === null ? 'border-dashed' : 'border-solid'
      } overflow-hidden bg-gray-50 border-gray-400 rounded-full md-4 flex flex-col items-center justify-center`}
      onTargetClick={onTargetClick}
      draggingOverFrameClassName='bg-gray-200 scale-110 border-primary2'
      draggingOverTargetClassName='bg-primary2/20 scale-110 border-primary2'
      onFrameDragEnter={event => console.log('onFrameDragEnter', event)}
      onFrameDragLeave={event => console.log('onFrameDragLeave', event)}
      onFrameDrop={event => console.log('onFrameDrop', event)}
      onDragOver={event => console.log('onDragOver', event)}
      onDragLeave={event => console.log('onDragLeave', event)}
      onDrop={onFileDrop}
    >
      {file === null ? (
        <>
          <UploadSimple size={64} className='mx-auto text-gray-400' />
          <p className='mx-6 text-center text-sm font-semibold'>
            Drop files to upload or{' '}
            <span className='text-primary underline'>browse</span>
          </p>
        </>
      ) : (
        <img
          src={URL.createObjectURL(file)}
          alt='Uploaded File'
          className='h-full w-full '
        />
      )}
    </FileDrop>
  );
};

export default ImageLoader;
