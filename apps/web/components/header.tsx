// Header.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sun, Moon, ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

interface NavItemProps {
  title: string;
  children: React.ReactNode;
}

const submenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const NavItem: React.FC<NavItemProps> = ({ title, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // For mobile submenu
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsHovered(false);
        setIsSubmenuOpen(false);
      }
    };

    if (isHovered || isSubmenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered, isSubmenuOpen]);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      aria-haspopup="true"
      aria-expanded={isHovered || isSubmenuOpen}
    >
      <button
        className="flex items-center space-x-1 text-gray-abc-100 dark:text-gray-abc-500 hover:text-gray-600 dark:hover:text-gray-abc-400 focus:outline-none font-semibold"
        type="button"
        onClick={() => isMobile && toggleSubmenu()}
      >
        {title}
        <ChevronDown className="w-6 h-6 pt-1 text-gray-abc-100 dark:text-gray-abc-500" />
      </button>
      <AnimatePresence>
        {(isHovered || isSubmenuOpen) && (
          <motion.div
            className="absolute left-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={submenuVariants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Variants
const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: { x: "0%" },
};

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="container-custom flex items-center justify-between px-6 py-4 pt-10">
      {/* Logo */}
      <div className="flex items-center space-x-8">
        <Image
          src={
            theme === "dark"
              ? "/images/logo/logo-dark.png"
              : "/images/logo/logo-light.png"
          }
          alt="Untitled UI Logo"
          width={140}
          height={32}
          priority
          placeholder="blur"
          blurDataURL={
            theme === "dark"
              ? "/images/logo/logo-dark-blur.png"
              : "/images/logo/logo-light-blur.png"
          }
        />
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {/* Products Menu */}
        <NavItem title="Products">
          <ul className="py-2 space-y-1 text-sm text-gray-abc-100 dark:text-gray-abc-500">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Product 1
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Product 2
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Product 3
            </li>
          </ul>
        </NavItem>

        {/* Services Menu */}
        <NavItem title="Services">
          <ul className="py-2 space-y-1 text-sm text-gray-abc-100 dark:text-gray-abc-500">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Service 1
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Service 2
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Service 3
            </li>
          </ul>
        </NavItem>

        {/* Pricing */}
        <button className="text-gray-abc-100 dark:text-gray-abc-500 font-semibold hover:text-gray-600 dark:hover:text-gray-abc-400 focus:outline-none">
          Pricing
        </button>

        {/* Resources Menu */}
        <NavItem title="Resources">
          <ul className="py-2 space-y-1 text-sm text-gray-abc-100 dark:text-gray-abc-500">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Blog
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Docs
            </li>
          </ul>
        </NavItem>

        {/* About */}
        <button className="text-gray-abc-100 dark:text-gray-abc-500 font-semibold hover:text-gray-600 dark:hover:text-gray-abc-400 focus:outline-none">
          About
        </button>
      </nav>
      </div>


      {/* Desktop Buttons and Theme Toggle */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
        {/* Log in Button */}
        <button className="px-4 py-2 text-sm font-semibold text-gray-abc-300 dark:text-gray-abc-500 border border-gray-abc-400 dark:border-gray-abc-50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-abc-600">
          Log in
        </button>
        {/* Sign up Button */}
        <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-purple-700">
          Sign up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none mr-2"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-abc-800 p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close Button */}
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </button>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4 mt-8">
                {/* Products Menu */}
                <NavItem title="Products">
                  <ul className="py-2 space-y-1 text-sm text-gray-abc-100 dark:text-gray-abc-500">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Product 1
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Product 2
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Product 3
                    </li>
                  </ul>
                </NavItem>

                {/* Services Menu */}
                <NavItem title="Services">
                  <ul className="py-2 space-y-1 text-sm text-gray-abc-100 dark:text-gray-abc-500">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Service 1
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Service 2
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Service 3
                    </li>
                  </ul>
                </NavItem>

                {/* Pricing */}
                <button className="text-left text-gray-abc-100 dark:text-gray-abc-500 font-semibold hover:text-gray-600 dark:hover:text-gray-abc-400 focus:outline-none">
                  Pricing
                </button>

                {/* Resources Menu */}
                <NavItem title="Resources">
                  <ul className="py-2 space-y-1 text-sm text-gray-abc-100 dark:text-gray-abc-500">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Blog
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Docs
                    </li>
                  </ul>
                </NavItem>

                {/* About */}
                <button className="text-left text-gray-abc-100 dark:text-gray-abc-500 font-semibold hover:text-gray-600 dark:hover:text-gray-abc-400 focus:outline-none">
                  About
                </button>
              </nav>

              {/* Mobile Buttons */}
              <div className="mt-8 flex flex-col space-y-4">
                {/* Log in Button */}
                <button className="px-4 py-2 text-sm font-semibold text-gray-abc-300 dark:text-gray-abc-500 border border-gray-abc-400 dark:border-gray-abc-50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-abc-600">
                  Log in
                </button>
                {/* Sign up Button */}
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-purple-700">
                  Sign up
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
