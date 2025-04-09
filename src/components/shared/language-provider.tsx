"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "english" | "hindi" | "spanish"

type Translations = {
  [key: string]: {
    [key in Language]: string
  }
}

const translations: Translations = {
  welcome: {
    english: "Welcome to AgriSmart",
    hindi: "एग्रीस्मार्ट में आपका स्वागत है",
    spanish: "Bienvenido a AgriSmart",
  },
  get_started: {
    english: "Get Started",
    hindi: "शुरू करें",
    spanish: "Comenzar",
  },
  learn_more: {
    english: "Learn More",
    hindi: "और जानें",
    spanish: "Saber más",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language]
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
