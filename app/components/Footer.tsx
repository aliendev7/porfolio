"use client";
import Link from "next/link";
import { useLanguage } from "../providers/LanguageProvider";
import { Github, Linkedin, Mail } from "lucide-react";
import { LogoMark } from "./LogoMark";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-white border-t dark:bg-gray-950 border-gray-200/50 dark:border-gray-800/50">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br rounded-lg shadow-sm shadow-brand-green/30 from-brand-green to-brand-medium">
                <LogoMark className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 font-poiret dark:text-white">
                dran<span className="text-brand-green">zr</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: t.nav.about, href: "/about" },
                { name: t.nav.experience, href: "/experience" },
                { name: t.nav.projects, href: "/projects" },
                { name: t.nav.blogs, href: "/blogs" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl transition-all dark:bg-gray-800 dark:text-gray-400 hover:bg-brand-green hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl transition-all dark:bg-gray-800 dark:text-gray-400 hover:bg-brand-green hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="flex justify-center items-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl transition-all dark:bg-gray-800 dark:text-gray-400 hover:bg-brand-green hover:text-white"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-col gap-4 justify-between items-center md:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} dranzr. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made with <span className="text-red-500">♥</span> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
