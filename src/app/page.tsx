import React, { Suspense } from "react";
import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";
import Analysis from "./sections/Analysis";
import { PopularLatestPosts } from "./sections/PopularLatestPosts";
import TopUsers from "./sections/TopUsers";
import EaseOutAnimation from "@/components/Animations/EaseOutAnimation";
import Introduction from "./sections/Introduction";
export default function Home() {
  return (
    <>
      <main className="max-w-6xl m-auto flex flex-col items-center justify-between p-12">
        
        <Introduction></Introduction>
        <EaseOutAnimation>
          {/* <PopularLatestPosts /> */}
        </EaseOutAnimation>

        <Analysis />
        <TopUsers />
      </main>
    </>
  );
}
