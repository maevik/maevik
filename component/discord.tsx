"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import PlayingIcon from "@/component/icons/playing-icon";
import StoppedIcon from "@/component/icons/stopped-icon";

interface DiscordActivity {
  application_id: number;
  name: string;
  type: number;
  state?: string;
  details?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

interface DiscordData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: DiscordActivity[];
  spotify?: {
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

export default function DiscordStatus() {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const userId = "1333390445509742666";

  useEffect(() => {
    audioRef.current = new Audio("/theme.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch(
          `https://api.lanyard.rest/v1/users/${userId}`,
        );
        const data = await response.json();
        if (data.success) setDiscordData(data.data);
      } catch (err) {
        console.error("Failed to fetch Discord status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      online: "bg-green-500",
      idle: "bg-yellow-500",
      dnd: "bg-red-500",
      offline: "bg-gray-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Failed to toggle music:", err);
    }
  };

  const Skeleton = () => (
    <div className="flex items-center gap-4 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-gray-400/30" />
      <div className="flex flex-col gap-2">
        <div className="w-32 h-6 bg-gray-400/30 rounded" />
        <div className="w-24 h-4 bg-gray-400/20 rounded" />
      </div>
      <div className="ml-auto w-12 h-12 rounded-full bg-gray-400/30" />
    </div>
  );

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : !discordData ? (
        <div className="text-center p-4 text-gray-400">
          Discord status unavailable
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png?size=128`}
                alt={discordData.discord_user.username}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div
                className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-black/80 ${getStatusColor(discordData.discord_status)}`}
              />
            </div>
            <div className="flex-1">
              <h3 className="pl-5 text-2xl font-bold text-white">
                {discordData.discord_user.username}
              </h3>
            </div>
          </div>

          <button
            onClick={toggleMusic}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <PlayingIcon /> : <StoppedIcon />}
          </button>
        </div>
      )}
    </>
  );
}
