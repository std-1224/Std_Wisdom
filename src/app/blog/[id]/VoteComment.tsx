'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';
//component
import VoteButton from '@/components/VoteButton';

interface IVote {
    id: string;
    user_id: string;
    vote: number;
    to_id: string;
    isBlog: boolean;
}

const VoteComment: React.FC<{ blog_id: string }> = ({ blog_id }) => {
    // const [votes, setVotes] = useState<IVote[]>([]);
    const [voteCount, setVoteCount] = useState<number>(0);
    const { user } = useUserContext();
    // const userVote = votes.find(v => v.user_id === user?.uid);
    // const vote = userVote ? userVote.vote : 0;
    const [vote, setVote] = useState<number>(0);

    useEffect(() => {
        const fetchVotes = async () => {
            const response = await axios.get(`http://localhost:3000/api/blog/${blog_id}/vote`);
            // setVotes(response.data.votes);
            setVoteCount(response.data.voteCount);
            const userVote = response.data.votes.find((v: IVote) => v.user_id === user?.uid);
            if (userVote) {
                setVote(userVote.vote);
            } else {
                setVote(0);
            }
        }
        fetchVotes();
    }, [])

    const handleVote = async (_vote: number) => {

        const response = await axios.post(`http://localhost:3000/api/blog/${blog_id}/vote`, {
            user_id: user?.uid,
            vote: _vote,
            to_id: blog_id,
            isBlog: true,
        }, {
            headers: {
            'Authorization': `Bearer ${user?.accessToken}`, // Include the token in the Authorization header
        }});
        setVoteCount(response.data.voteCount);
        setVote(_vote);
    }

    return (
        <div className="py-4 border-t border-gray-200 mt-4">
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <VoteButton
                        voteType="Upvote"
                        onVote={() => handleVote(1)}
                        isSelected={vote === 1}
                    />
                    <span className="mx-4 text-lg font-semibold text-gray-800">{voteCount}</span>
                    <VoteButton
                        voteType="Downvote"
                        onVote={() => handleVote(-1)}
                        isSelected={vote === -1}
                    />
                </div>
            </div>
        </div>
    )
}
export default VoteComment;