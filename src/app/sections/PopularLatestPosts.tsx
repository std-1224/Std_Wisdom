import React from "react";
import PostCard from "@/components/PostCard";
import { fetchLatestPosts, fetchPopularPosts } from "@/app/api/blog/blogServices";
import BlogPost from "../api/blog/blogpost.types";
import { FaStar, FaClock } from 'react-icons/fa';


export const PopularLatestPosts = async () => {
    const popularPosts = await fetchPopularPosts();
    const latestPosts = await fetchLatestPosts();

    return (<div className="py-10">
        <section className="mb-12 flex items-center flex-col">
            <div className="flex items-center mb-6">
                <FaStar className="text-yellow-500 text-4xl mr-3" />
                <h2 className="text-4xl font-bold text-gray-800">Popular Posts</h2>
            </div>
            {popularPosts.length > 0 ? (
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {popularPosts.map((post: BlogPost) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </>
            ) : (
                <p>No blog posts available.</p>
            )}
        </section>
        <section className="mb-12 flex items-center flex-col">
            <div className="flex items-center mb-6">
                <FaClock className="text-blue-500 text-4xl mr-3" />
                <h2 className="text-4xl font-bold text-gray-800">Latest Posts</h2>
            </div>
            {latestPosts.length > 0 ? (
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {latestPosts.map((post: BlogPost) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </>
            ) : (
                <p>No blog posts available.</p>
            )}
        </section>
    </div >)
}