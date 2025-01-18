"use client"

interface ExampleRequestProps {
  example: Record<string, any>
}

export function ExampleRequest({ example }: ExampleRequestProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mt-6 mb-3">Example Request</h3>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
        <code>{JSON.stringify(example, null, 2)}</code>
      </pre>
    </div>
  )
}