"use client"

import { Parameter } from "@/types/api"

interface ParametersTableProps {
  parameters: Parameter[]
}

export function ParametersTable({ parameters }: ParametersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Name</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Required</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param) => (
            <tr key={param.name}>
              <td className="py-2">{param.name}</td>
              <td className="py-2">{param.type}</td>
              <td className="py-2">{param.required ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}