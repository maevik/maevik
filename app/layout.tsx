import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AudioProvider } from "@/component/provider/audio";
import { BackgroundProvider } from "@/component/provider/background";

import Navbar from "@/component/navbar";
import Footer from "@/component/footer";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Maevik/DEV",
	description: "Maevik/DEV is a developer from Myanmar since 2023.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<BackgroundProvider>
					<AudioProvider>
						<Navbar />
						{children}
						<Footer />
					</AudioProvider>
				</BackgroundProvider>
			</body>
		</html>
	);
}
