import admin from 'firebase-admin';

type BlogPost = {
    id: number;
    title: string;
    content: string;
    image: string;
    user_id: string;
    commentCount: number;
    voteCount: number;
    timestamp: admin.firestore.Timestamp;
    tags: string[];
    author: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    };
};
export default BlogPost;