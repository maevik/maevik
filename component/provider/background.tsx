"use client";

import { useEffect, useState } from "react";

const backgrounds = [
    "/backgrounds/1.jpg",
    "/backgrounds/2.png",
    "/backgrounds/3.png",
    "/backgrounds/4.png",
    "/backgrounds/5.png",
];

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
    const [background, setBackground] = useState<string | null>(null);

    useEffect(() => {
        const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        setBackground(randomImage);
    }, []);

    return (
        <div
            className="min-h-screen transition-opacity duration-1000 ease-in-out"
            style={{
                backgroundImage: background ? `url('${background}')` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                opacity: background ? 1 : 0,
                backgroundColor: "black",
            }}
        >
            {children}
        </div>
    );
}