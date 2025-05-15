import { User } from "./userTypes";

const Users: User[] = [
    {
        id: 1,
        name: "Prongs",
        avatarUrl: "/user1.png",
        following: 129424
    },
    {
        id: 2,
        name: "Ron Wisley",
        avatarUrl: "/user2.png",
        following: 540
    },
    {
        id: 3,
        name: "James Potter",
        avatarUrl: "/user3.png",
        following: 9852
    },
    {
        id: 4,
        name: "Sirius Black",
        avatarUrl: "/user4.png",
        following: 3195
    },
    {
        id: 5,
        name: "Hermione Granger",
        avatarUrl: "/user3.png",
        following: 749
    },
    {
        id: 6,
        name: "Harry Potter",
        avatarUrl: "/user2.png",
        following: 435
    },
    
]

export async function fetchTopUsers() {
    const topUsers = Users.sort((user) => user.following).slice(0, 6);
    return topUsers;
}
