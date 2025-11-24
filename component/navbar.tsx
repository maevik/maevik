"use client";

import { useState } from "react";
import MenuIcon from "@/component/icons/menu-icon";
import CloseIcon from "@/component/icons/close-icon";
import Link from "next/link";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/blogs", label: "Blogs" },
	{ href: "/projects", label: "Projects" },
	{ href: "/services", label: "Services" },
	{ href: "/about", label: "About" },
];

const navLinkClass =
	"block text-center px-3 py-2 transition-all duration-300 transform hover:text-white hover:[text-shadow:_0_0_30px_rgba(255,255,255,1),_0_0_50px_rgba(255,255,255,0.8)]";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="fixed w-full z-50 text-white font-bold flex justify-center">
			<div className="w-full">
				<div className="border-b-2 border-white/20 bg-black/20 backdrop-blur-3xl backdrop-saturate-150 rounded-b-3xl overflow-hidden transition-all duration-500 ease-in-out">
					<div className="flex flex-col items-center w-full">
						<button
							className="md:hidden flex items-center justify-center p-3"
							onClick={() => setMenuOpen(!menuOpen)}
							aria-label="Toggle menu"
						>
							{menuOpen ? <CloseIcon /> : <MenuIcon />}
						</button>

						<ul className="hidden md:flex justify-center flex-1 space-x-8 px-6 py-4 w-full">
							{navItems.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className={navLinkClass}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>

						<ul
							className={`md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out overflow-hidden ${
								menuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
							}`}
						>
							{navItems.map((item) => (
								<li key={item.href} className="w-full">
									<Link
										href={item.href}
										className={navLinkClass}
										onClick={() => setMenuOpen(false)}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
