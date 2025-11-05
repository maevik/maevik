import { JSX } from "react/jsx-dev-runtime";

import DiscordIcon from "@/component/icons/discord-icon";
import EmailIcon from "@/component/icons/email-icon";
import TelegramIcon from "@/component/icons/telegram-icon";
import GithubIcon from "@/component/icons/github-icon";

interface SocialLinks {
  href: string;
  ariaLabel: string;
  icon: JSX.Element;
}

const SOCIAL_LINKS: SocialLinks[] = [
  {
    href: "mailto:minthetkyaw404@gmail.com",
    ariaLabel: "Email",
    icon: <EmailIcon />,
  },
  {
    href: "https://discord.com/users/1333390445509742666",
    ariaLabel: "Discord",
    icon: <DiscordIcon />,
  },
  {
    href: "https://telegram.org/maevik84",
    ariaLabel: "Telegram",
    icon: <TelegramIcon />,
  },
  {
    href: "https://github.com/maevik",
    ariaLabel: "GitHub",
    icon: <GithubIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="z-50 fixed bottom-0 w-full border-t-2 border-white/20 bg-black/20 backdrop-blur-3xl backdrop-saturate-150 rounded-t-3xl text-white py-1">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        <p className="text-sm text-gray-100">
          © Maevik/DEV {new Date().getFullYear()}
        </p>

        <ul className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.ariaLabel}>
              <a
                href={link.href}
                aria-label={link.ariaLabel}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
