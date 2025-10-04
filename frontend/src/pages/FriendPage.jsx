import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFriends } from "../lib/api";
import Loader from "../components/Loader";
import NoFriendsFound from "../components/NoFriendsFound";
import FriendCard from "../components/FriendCard";

const FriendPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isLoading && friends.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <NoFriendsFound />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 ">
          Friends
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
