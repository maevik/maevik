"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

interface AudioContextType {
	isLoading: boolean;
	isPlaying: boolean;
	toggleMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [picked] = useState(() => {
		const tracks = ["theme.mp3", "theme-origin.mp3"];
		const rand = Math.floor(Math.random() * tracks.length);
		return tracks[rand];
	});

	useEffect(() => {
		const audio = new Audio(`/${picked}`);
		audio.loop = true;
		audio.volume = 0.5;
		audioRef.current = audio;

		const handleCanPlay = () => setIsLoading(false);
		audio.addEventListener("canplaythrough", handleCanPlay, { once: true });

		return () => {
			audio.pause();
			audio.removeEventListener("canplaythrough", handleCanPlay);
		};
	}, [picked]);

	const toggleMusic = async () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			await audioRef.current.play();
			setIsPlaying(true);
		}
	};

	return (
		<AudioContext.Provider value={{ isLoading, isPlaying, toggleMusic }}>
			{children}
		</AudioContext.Provider>
	);
}

export function useAudio() {
	const ctx = useContext(AudioContext);
	if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
	return ctx;
}
