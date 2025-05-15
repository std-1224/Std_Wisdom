'use client';
import BlogPost from "@/app/api/blog/blogpost.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import truncate from 'html-truncate';
import Chip from "@/components/Chip";
import { formatFirestoreTimestamp } from "@/utils/helper";

const PostCard = ({ id, title, content, image, author, timestamp, tags }: BlogPost) => {

    return (
        <div className="relative pb-20 border border-gray-200 rounded-lg shadow-lg bg-white transition-transform transform hover:shadow-xl duration-300">
            <Image src={image} className="w-full rounded-t-lg aspect-[16/16]" width={1000} height={1000} alt="Image for blog" />

            <div className="px-4 py-6">
                <Link href={`/blog/${id}`} className="block text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                    {title}
                </Link>
                <div className="mb-6 text-gray-700 text-sm mt-5" dangerouslySetInnerHTML={{ __html: truncate(content, 100) }} />

                {/* Tag List */}
                {tags && tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap">
                        {tags.map((tag, index) => (
                            <Chip key={'chip-' + index} label={tag} />
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 text-gray-700 absolute bottom-2">
                <div className="flex items-center">
                    {/* Author Avatar */}
                    <Image
                        src={author.avatar}
                        alt={`${author.name}'s avatar`}
                        width={72}
                        height={72}
                        className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-lg">{author.name}</span>
                        <span className="text-gray-500 text-sm">{author.email}</span>
                    </div>
                </div>
                <div className="text-gray-500 text-xs mt-4">
                    <span>{formatFirestoreTimestamp(timestamp)}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
