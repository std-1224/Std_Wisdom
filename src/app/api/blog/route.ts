// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection,where, getDocs, query, orderBy } from 'firebase/firestore'; // Import required Firestore functions
import admin from 'firebase-admin'; 
import { adminDb } from '@/lib/firebase_admin'; // Import admin Firestore
import { db as clientDb } from '@/lib/firebase'; // Import client Firestore
export async function GET(request: NextRequest) {
  try {
    // Parse the query parameters from the request URL
    const url = new URL(request.url);
    const queryParam = url.searchParams.get('query') || '';
    const page = Number(url.searchParams.get('page')) || 1;

    if (page < 1) {
      throw new Error('Invalid page number');
    }

    // Define your Firestore query for blog posts
    const postsRef = collection(clientDb, 'blogPosts'); // Reference to your 'blogPosts' collection
    const postsQuery = query(
      postsRef,
      orderBy('timestamp', 'desc'), // Order by timestamp (newest first)
    );

    const querySnapshot = await getDocs(postsQuery);
    const filteredPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch user data for each post
    const userIds = Array.from(new Set(filteredPosts.map(post => post.user_id))); // Get unique user_ids
    const usersRef = collection(clientDb, 'users'); // Reference to your 'users' collection
    const usersQuery = query(usersRef, where('uid', 'in', userIds)); // Query for users based on user_ids
    const userSnapshot = await getDocs(usersQuery);
    
    const usersData: unknown[] = [];
    userSnapshot.docs.forEach(doc => {
      const user = doc.data();
      usersData[user.uid] = { name: user.name, email: user.email, id: user.uid , avatar: user.avatar,}; // Store user data by uid
    });

    // Map posts to include author information
    const results = queryParam
      ? filteredPosts.filter(post =>
        post.title.toLowerCase().includes(queryParam.toLowerCase()) ||
        post.content.toLowerCase().includes(queryParam.toLowerCase())
      ).map(post => ({
        ...post,
        author: usersData[post.user_id] || { name: 'Unknown', email: '', id: '', avatar: '' } // Add author information
      }))
      : filteredPosts.map(post => ({
        ...post,
        author: usersData[post.user_id] || { name: 'Unknown', email: '', id: '', avatar : '' } // Add author information
      }));

    return NextResponse.json({ blogPosts: results.slice(12 * (page - 1), 12 * page), totalPage: Math.ceil(results.length / 12) });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { title, content, image, tags, user_id } = data;

  try {
    const docRef = await adminDb.collection('blogPosts').add({
      title,
      content,
      image,
      user_id,
      tags,
      commentCount: 0,
      voteCount: 0,
      timestamp: admin.firestore.Timestamp.now(),
    });
    return NextResponse.json({ message: 'Blog post created successfully!', docId: docRef.id });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error creating blog post', details: error.message });
  }
}

export async function fetchTotalPage(query: string) {
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase())
  );
  return Math.ceil(filteredPosts.length / 12);
}

// export async function fetchLatestPosts() {
//   const latestPosts = blogPosts.sort(() => Math.random() - 0.5).slice(0, 6);
//   return latestPosts;
// }

// export async function fetchPopularPosts() {
//   const popularPosts = blogPosts.sort(() => Math.random() - 0.5).slice(0, 6);
//   return popularPosts;
// }

