import React from "react"
export const BlogPostSkeleton = () => {
    return (
        <div className="relative p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-100 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div> {/* Title placeholder */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 1 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 2 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 3 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 4 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 5 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 6 */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 7 */}
            <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div> {/* Content line 8 */}

            <div className="absolute bottom-4 right-6 h-4 bg-gray-300 rounded w-24"></div> {/* Read more placeholder */}
        </div>
    )
}

export const BlogPostsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
                <BlogPostSkeleton key={index} />
            ))}
        </div>
    )
}

export const UserCardSkeleton = () => {
    return (
        <div className="relative p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-100 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gray-300"></div> {/* Avatar placeholder */}
            <div className="flex items-center justify-between mt-2">
                <div className="text-sm font-semibold text-gray-700">Username</div>
                <div className="text-sm font-semibold text-gray-600">Rank</div>
            </div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div> {/* Rank line */}
        </div>
    )
}

export const TopUsersSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
                <UserCardSkeleton key={index} />
            ))}
        </div>
    )
}