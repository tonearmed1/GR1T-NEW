import React from "react";

import AboutHero from "./components/hero";
import OurStory from "./components/OurStory";
import MeetFounders from "./components/MeetFounders";
import YouTubeEmbed from "./components/youtubeVid";

export default function About() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <MeetFounders />
      <YouTubeEmbed />
    </>
  );
}
