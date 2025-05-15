import React from "react";
import UserCard from "@/components/UserCard";
import { User } from "../api/user/user.types";
import { fetchTopUsers } from "../api/user/route";

const TopUsers = async () => {
    const topUsres = await fetchTopUsers();
    return (
        <div className="w-full mt-12">
            <h2 className="text-4xl font-bold mb-6 text-center">Top Users</h2>
            {topUsres.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topUsres.map((user: User) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <p>No high-ranking users found.</p>
            )}
        </div>
    )
}

export default TopUsers;