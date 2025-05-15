import React from 'react';
import { User } from '@/app/api/user/user.types';

type UserCardProps = {
  user: User;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
        className="w-16 h-16 rounded-full mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-600 mt-1">Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.</p>
      <p className="text-sm text-gray-600 mt-1">Following: {user.following}</p>
    </div>
  );
};

export default UserCard;
