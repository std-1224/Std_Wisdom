import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, addDoc, setDoc, getDoc, doc } from 'firebase/firestore'; // Firestore functions
import { db as clientDb } from '@/lib/firebase'; // Client Firestore
import { adminDb, admin } from '@/lib/firebase_admin'; // Firestore

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Create a query to find votes with the matching blog_id
        const votesQuery = query(
            collection(clientDb, 'votes'),
            where('blog_id', '==', id)
        );

        // Execute the query
        const querySnapshot = await getDocs(votesQuery);
        let voteCount = 0;

        // Map through documents and extract data
        const votes = querySnapshot.docs.map((doc) => {
            voteCount += doc.data().vote;
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        return NextResponse.json({ votes, voteCount }); // Return the votes as JSON response
    } catch (error) {
        console.error('Error fetching votes:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the votes.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await request.json();
    const { vote, user_id } = data;
    const voteData = { user_id, vote, to_id: id, isBlog: true };
    const blogRef = doc(clientDb, 'blogPosts', id);
    try {
        const docRef = await adminDb.collection('votes').add(voteData);
        console.log("Vote added with ID:", docRef.id);
        const blogDoc = await getDoc(blogRef);
        const voteCount = blogDoc.data()?.voteCount + (vote === 1 ? 1 : -1);
        await setDoc(blogRef, {
            voteCount,
            ...blogDoc,
        })
        return NextResponse.json({ message: 'Vote added successfully!', doc_id: docRef.id, /*voteCount: voteCount*/ });
    } catch (err) {
        console.error('Error adding vote:', err);
        return NextResponse.json({ error: 'An error occurred while adding the vote.' }, { status: 500 });
    }
}