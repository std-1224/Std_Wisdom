// pages/createBlog.tsx
'use client'
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

import { useUserContext } from '@/context/UserContext';
import { storage } from '@/lib/firebase'; // Ensure Firebase storage is initialized
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import Chip from '@/components/Chip'; // Import the Chip component

const MyEditor = dynamic(() => import('@/components/MyEditor'), {
  ssr: false,
});

const CreateBlog = () => {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter' && newTag.trim() !== "") {
      e.preventDefault();
      console.log(newTag.trim());
      setTags((prevs) => [...prevs, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!title || !content) {
      alert("Please enter a title and content");
      return;
    }

    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `blogImages/${uuidv4()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const res = await fetch('/api/blog/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image: imageUrl, tags, user_id: user?.uid }),
      });

      const result = await res.json();
      setIsSubmitting(false);
      router.push('/blogs');
    } catch (error) {
      console.error('Error posting data:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm p-3"
            placeholder="Enter blog title"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="text-lg font-medium text-gray-700 mb-2">Content</label>
          <MyEditor id='content' value={content} onChange={setContent} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg font-medium text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mb-4"
          />
          {previewImage && <img src={previewImage} alt="Preview" className="max-w-sm mb-4" />}
        </div>

        <div className="flex flex-col">
          <label htmlFor="tags" className="text-lg font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={handleTagInputChange}
              onKeyDown={handleTagAdd}
              className="border border-gray-300 rounded-md shadow-sm p-3 flex-1"
              placeholder="Press Enter to add a tag"
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleTagRemove(tag)}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Create Blog Post"
          )}
        </button>

      </form>
    </div>
  );
};

export default CreateBlog;
