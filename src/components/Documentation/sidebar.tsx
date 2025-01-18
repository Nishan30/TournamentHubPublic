"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ApiCategory } from "@/types/api"
import Link from "next/link"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline"

interface SidebarProps {
  apis: ApiCategory[]
}

export function Sidebar({ apis }: SidebarProps) {
  // State to track expanded categories and sections
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-background border-r">
      <ScrollArea className="h-full py-6">
        <div className="px-4">
          {/* Sidebar Title */}
          <h2 className="text-lg font-semibold mb-4">API Documentation</h2>
          {/* Navigation Menu */}
          <nav className="space-y-4">
            {/* Iterate over each category */}
            {apis.map((category) => {
              const isCategoryExpanded = expandedCategories.has(category.id)
              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex justify-between items-center text-base font-semibold mb-2 focus:outline-none"
                    aria-expanded={isCategoryExpanded}
                    aria-controls={`category-${category.id}`}
                  >
                    {category.name}
                    <span className="w-4 h-4">
                      {isCategoryExpanded ? (
                        <ChevronDownIcon className="w-4 h-4" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  <div id={`category-${category.id}`}>
                    {isCategoryExpanded && (
                      <div className="ml-4 space-y-2">
                        {/* Iterate over each section within the category */}
                        {category.sections.map((section) => {
                          const isSectionExpanded = expandedSections.has(section.id)
                          return (
                            <div key={section.id}>
                              {/* Section Header */}
                              <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex justify-between items-center text-sm font-medium mb-1 focus:outline-none"
                                aria-expanded={isSectionExpanded}
                                aria-controls={`section-${section.id}`}
                              >
                                {section.name}
                                <span className="w-4 h-4">
                                  {isSectionExpanded ? (
                                    <ChevronDownIcon className="w-4 h-4" />
                                  ) : (
                                    <ChevronRightIcon className="w-4 h-4" />
                                  )}
                                </span>
                              </button>
                              <div id={`section-${section.id}`}>
                                {isSectionExpanded && (
                                  <ul className="ml-4 space-y-1">
                                    {/* Iterate over each endpoint within the section */}
                                    {section.endpoints.map((endpoint) => (
                                      <li key={endpoint.name}>
                                        {/* Link to Endpoint */}
                                        <Link
                                          href={`#${section.id}-${endpoint.name
                                            .replace(/\s+/g, "-")
                                            .toLowerCase()}`}
                                          className="block text-sm text-muted-foreground hover:underline"
                                        >
                                          {endpoint.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}