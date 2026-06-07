"use client"
import Link from "next/link"
import { MenuClose, MenuOpen } from "./svgs"
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../providers/LanguageProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

type HeaderProps = { active: string; isDark?: boolean };

const Header: React.FC<HeaderProps> = ({ active, isDark }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
             setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen]);

    const menuItems = [
        { name: t.nav.home, linkTo: "/" },
        { name: t.nav.about, linkTo: "/about" },
        { name: t.nav.experience, linkTo: "/experience" },
        { name: t.nav.projects, linkTo: "/projects" },
        { name: t.nav.resources, linkTo: "/resources" }
    ]

    return (
        <>
            <motion.nav 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 right-0 left-0 z-50 px-4 mx-auto mt-6 w-full max-w-4xl"
            >
                <div className={`
                    flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300
                    ${isDark ? 'border-gray-700 bg-white/5' : 'border-gray-200 bg-white/80'}
                    border shadow-lg shadow-black/5 backdrop-blur-sm
                    ${scrolled ? 'shadow-xl shadow-black/10' : ''}`}>
                    {/* Logo */}
                    {/* Logo */}
                    <div className="flex-shrink-0 pl-2">
                        <Logo compact />
                    </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden gap-2 items-center px-4 md:flex flex-1 justify-center">
                            {menuItems.map((item, index) => (
                                <MenuItem 
                                    key={index}
                                    {...item} 
                                    active={active} 
                                />
                            ))}
                        </div>

                        {/* Right Section: Theme + Language + Mobile Menu */}
                        <div className="flex gap-1.5 items-center pr-2 pl-2 border-l border-gray-300/20 dark:border-gray-700/50">
                            <div className="hidden md:block">
                                <ThemeToggle />
                            </div>
                            <LanguageSwitcher />
                            
                            {/* Mobile Menu Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`
                                    md:hidden p-2 rounded-full transition-colors
                                    ${menuOpen 
                                        ? 'text-foreground dark:text-white hover:bg-white/10' 
                                        : 'text-foreground dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }
                                `}
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? <MenuClose /> : <MenuOpen />}
                            </motion.button>
                        </div>
                    </div>
                </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/50" />
                        
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl"
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Menu Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                                    <Logo compact={false} />
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        className="p-2 rounded-lg transition-colors text-foreground dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <MenuClose />
                                    </button>
                                </div>
                                
                                {/* Mobile Menu Items */}
                                <nav className="flex-1 px-6 py-8">
                                    <div className="space-y-2">
                                        {menuItems.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <MenuItem {...item} active={active} isMobile />
                                            </motion.div>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header

export const Logo = ({ compact }: { compact?: boolean }) => (
    <Link href="/" className="flex gap-2 items-center group focus-ring rounded-xl">
        <div className="flex justify-center items-center w-9 h-9 bg-gradient-to-br rounded-xl shadow-md shadow-brand-green/30 from-brand-green to-brand-medium transition-transform duration-300 group-hover:scale-105">
            <LogoMark className="w-5 h-5 text-white" />
        </div>
        {!compact && (
            <div className="text-lg font-bold tracking-wide text-foreground dark:text-white font-poiret">
                dran<span className="text-brand-green">zr</span>
            </div>
        )}
    </Link>
)

export const MenuItem = ({ name, linkTo, active, isMobile }: { name: string, linkTo: string, active: string, isMobile?: boolean }) => {
    const isActive = linkTo === active;
    
    if (isMobile) {
        return (
            <Link 
                href={linkTo} 
                className={`
                    block px-4 py-3 rounded-xl text-base font-semibold transition-all
                    ${isActive 
                        ? 'bg-gradient-to-r shadow-md text-foreground dark:text-white from-brand-green to-brand-medium' 
                        : 'text-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                `}
            >
                {name}
            </Link>
        )
    }

    return (
        <Link 
                href={linkTo} 
                className={`
                    relative px-4 py-2 text-sm md:text-base font-medium transition-all duration-200 rounded-full
                ${isActive 
                    ? 'bg-gradient-to-r shadow-md text-foreground dark:text-white from-brand-green to-brand-medium' 
                    : 'text-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                }
            `}
        >
            {isActive && (
                <motion.span 
                layoutId="activeTab"
                className="absolute inset-0 z-0 bg-gradient-to-r rounded-full shadow-md from-brand-green to-brand-medium"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
            )}
            <span className="relative z-10">{name}</span>
        </Link>
    )
}