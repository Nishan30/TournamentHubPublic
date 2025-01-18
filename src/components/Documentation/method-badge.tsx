"use client"

import { Badge } from "@/components/ui/badge"

const methodColors = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
} as const

interface MethodBadgeProps {
  method: keyof typeof methodColors
}

export function MethodBadge({ method }: MethodBadgeProps) {
  return (
    <Badge className={methodColors[method]}>
      {method}
    </Badge>
  )
}