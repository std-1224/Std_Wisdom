import { PostRow } from './PostRow';
import SearchBar from '@/components/SearchBar';
import { BlogPostsSkeleton } from '@/components/Skeletons';

import React, { Suspense } from 'react';


export default async function BlogList({
    searchParams,
}: {
    searchParams?: {
        query: string; // Search query from the URL query parameters
        page: number;
    }
}) {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <SearchBar className="m-6" />
            <Suspense key={query} fallback={<BlogPostsSkeleton />}>
                <PostRow query={query} page = {page}></PostRow>
            </Suspense>
        </div>
    )
}