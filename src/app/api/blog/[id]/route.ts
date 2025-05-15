// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import { collection,where, getDocs, query, orderBy } from 'firebase/firestore'; // Import required Firestore functions

import { doc, getDoc } from 'firebase/firestore'; // Import required Firestore functions
import { db as clientDb } from '@/lib/firebase'; // Import client Firestore

// GET handler to fetch a blog post by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Create a reference to the blog post document in Firestore
    const postRef = doc(clientDb, 'blogPosts', id);
    
    // Fetch the document
    const postDoc = await getDoc(postRef);

    // Check if the document exists
    if (postDoc.exists()) {
      const userRef = doc(clientDb, 'users', postDoc.data().user_id);
      const userDoc = await getDoc(userRef);
      const postData = { id: postDoc.id, ...postDoc.data(), author: userDoc.data() }; // Combine the ID with the document data
      
      return NextResponse.json(postData); // Return the post if found
    } else {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 }); // Return 404 if not found
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the blog post.' }, { status: 500 }); // Handle errors
  }
}
