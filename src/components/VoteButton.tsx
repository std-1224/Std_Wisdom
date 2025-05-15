import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

interface VoteButtonProps {
    voteType: string;
    onVote: () => void;
    isSelected: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ voteType, onVote, isSelected }) => {
    return (
        <button
            onClick={() => onVote()}
            style={{
                backgroundColor: 'transparent', // No background for icon buttons
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                fontSize: '32px', // Increase icon size
            }}
        >
            {voteType === 'Upvote'
                ? isSelected
                    ? <FaThumbsUp color="gray" />  // Filled when selected
                    : <FaRegThumbsUp color="gray" /> // Outlined when not selected
                : isSelected
                    ? <FaThumbsDown color="gray" />  // Filled when selected
                    : <FaRegThumbsDown color="gray" /> // Outlined when not selected
            }
        </button>
    )
}

export default VoteButton;