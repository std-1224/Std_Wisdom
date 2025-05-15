import React from "react";
import axios from 'axios';
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import BlogPost from "../api/blog/blogpost.types";

type FetchBlogList = {
    blogPosts: BlogPost[],
    totalPage: number;  // Total number of pages to display
}

async function fetchBlogList(query: string, page: number): Promise<FetchBlogList> {
    try {
        const response = await axios.get(`http://localhost:3000/api/blog`, {
            params: { query, page } // Sending query as a query parameter
        });
        return response.data; // Access the data from the response
    } catch (error) {
        console.error('Error fetching blog list:', error);
        return { blogPosts: [], totalPage: 0 }; // Return an empty array in case of an error
    }
}


export const PostRow = async ({ query, page }: { query: string, page: number }) => {
    const { blogPosts, totalPage } = await fetchBlogList(query, page);

    return (<>
        {blogPosts.length > 0 ? (
            <>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {blogPosts.map((post: BlogPost) => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </div>
                <Pagination totalPage={totalPage} />
            </>
        ) : (
            <p>No blog posts available.</p>
        )}
    </>)
}