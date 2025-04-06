import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import RProgressBar from "@/components/RComponents/RProgressBar/RProgressBar";
import { useTranslation } from "react-i18next";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export interface HomeContextType {
  theme: string;
  toggleTheme: (newTheme: string) => void;
  activeLanguage: string;
  switchLanguage: (language: string) => void;
  // isScrolled: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const HomeContext = createContext<HomeContextType>({
  theme: "",
  toggleTheme: () => { },
  activeLanguage: "en",
  switchLanguage: () => { },
  // isScrolled: false,
});

const HomeLayout = () => {
  const { i18n } = useTranslation();
  // const [isScrolled, setIsScrolled] = useState(false);

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "main-theme-light"
  );
  const [activeLanguage, setActiveLanguage] = useState<string>(
    localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")
    if (!currentTheme)
      localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    // Apply saved theme from localStorage or use default
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.querySelector("html")?.setAttribute("data-theme", savedTheme);
    }
    const language = localStorage.getItem("lang");
    if (language) {
      setActiveLanguage(language);
      i18n.changeLanguage(language);
      // Set initial direction based on saved language
      document.querySelector("html")?.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    }
    else document.querySelector("html")?.setAttribute("dir", "ltr")
  }, [i18n]);

  // Define the toggleTheme function with its type
  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.querySelector("html")?.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Persist theme
  };

  const switchLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setActiveLanguage(language);
    document.querySelector("html")?.setAttribute("lang", language);
    document.querySelector("html")?.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", language);
    window.location.reload();
  };

  useScrollToTop();
  // Add scroll event listener
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     setIsScrolled(scrollPosition > 45); // 45px is the height of top bar
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  return (
    <>
      <HomeContext.Provider
        value={{ theme, toggleTheme, activeLanguage, switchLanguage }}
      >
        <RProgressBar />
        <Outlet />
      </HomeContext.Provider>
    </>
  );
};

export default HomeLayout;
