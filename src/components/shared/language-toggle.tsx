"use client"

import { useTranslation } from "@/components/shared/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { setLanguage } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("english")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hindi")}>हिन्दी (Hindi)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("spanish")}>Español (Spanish)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
