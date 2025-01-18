"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Parameter } from "@/types/api"

interface ParameterEditorProps {
  parameters: Parameter[]
  onChange: (values: Record<string, string>) => void
  values: Record<string, string>
}

export function ParameterEditor({ parameters, onChange, values }: ParameterEditorProps) {
  const handleChange = (name: string, value: string) => {
    onChange({ ...values, [name]: value })
  }

  return (
    <div className="space-y-4">
      {parameters.map((param) => (
        <div key={param.name} className="grid gap-2">
          <Label htmlFor={param.name}>
            {param.name}
            {param.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id={param.name}
            placeholder={`Enter ${param.name} (${param.type})`}
            value={values[param.name] || ""}
            onChange={(e) => handleChange(param.name, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}