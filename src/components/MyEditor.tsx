'use client'
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface MyEditorProps {
  id: string,
  value: string,
  onChange: (value: string) => void,
}

const MyEditor: React.FC<MyEditorProps> = ({ id, value, onChange }) => {
  
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  if (!editorLoaded) {
    // Optionally render a placeholder or loading state
    return <div>Loading...</div>;
  }
  return (
    <ReactQuill id={id} value={value} onChange={onChange} />
  );
}

export default MyEditor;