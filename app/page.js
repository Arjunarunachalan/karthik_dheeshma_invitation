"use client";

import { useCallback, useState } from "react";
import OpeningExperience from "../components/intro/OpeningExperience";
import HeroSection from "../components/hero/HeroSection";
import NavHeader from "../components/navigation/NavHeader";
import ButterflyLayer from "../components/effects/ButterflyLayer";
import AtmosphereLayer from "../components/effects/AtmosphereLayer";
import SparkleTrail from "../components/effects/SparkleTrail";
import MusicPlayer from "../components/audio/MusicPlayer";
import ScrollProgress from "../components/navigation/ScrollProgress";
import CoupleSection from "../components/couple/CoupleSection";
import CountdownSection from "../components/details/CountdownSection";
import EventsSection from "../components/details/EventsSection";
import VenueSection from "../components/location/VenueSection";
import PhotoGallery from "../components/gallery/PhotoGallery";
import DownloadInvitation from "../components/invitation/DownloadInvitation";
import ClosingSection from "../components/closing/ClosingSection";
import { invitationData } from "../data/invitation";

export default function Home() {
  const [isHeroActive, setIsHeroActive] = useState(false);

  const handleOpeningComplete = useCallback(() => {
    // Trigger the hero reveal as the envelope and invitation card open
    setIsHeroActive(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    // Opening overlay has finished its transition
  }, []);

  return (
    <main className="relative mx-auto min-h-[100svh] w-full max-w-[430px] overflow-x-hidden bg-[#0d0b0a]">
      {/* Interactive Golden Stardust Touch/Pointer Trail */}
      <SparkleTrail />

      {/* Royal Golden Filigree Scroll Progress & Chapter Tracker */}
      <ScrollProgress />

      {/* Cinematic Ethereal Atmosphere: Floating Rose Petals & Golden Bokeh */}
      <AtmosphereLayer />

      {/* Decorative 3D Fluttering Butterfly Layer */}
      <ButterflyLayer />

      {/* Romantic Ambient Audio Player Toggle */}
      <MusicPlayer />

      {/* Section 1: Cinematic Envelope Opening with Wax Seal */}
      <OpeningExperience
        onOpeningComplete={handleOpeningComplete}
        onTransitionComplete={handleTransitionComplete}
        data={invitationData}
      />

      {/* Section 2: Cinematic Wedding Hero Reveal */}
      <HeroSection data={invitationData} active={isHeroActive} />

      {/* Discreet Navigation Bar (visible after hero activation) */}
      <NavHeader active={isHeroActive} />

      {/* Section 3: Couple Photo Editorial Section */}
      <CoupleSection data={invitationData} />

      {/* Section 4: Wedding Date & Live Countdown */}
      <CountdownSection data={invitationData} />

      {/* Section 5: Wedding Events & Details Schedule */}
      <EventsSection data={invitationData} />

      {/* Section 6: Auditorium Location & Directions */}
      <VenueSection data={invitationData} />

      {/* Section 7: Pinterest-Style Couple Photo Gallery */}
      <PhotoGallery data={invitationData} />

      {/* Section 8: Downloadable Wedding Invitation Card */}
      <DownloadInvitation data={invitationData} />

      {/* Section 9: Closing Scene */}
      <ClosingSection data={invitationData} />
    </main>
  );
}
