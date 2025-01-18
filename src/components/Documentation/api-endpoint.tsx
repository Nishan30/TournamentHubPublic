"use client"

import { ApiEndpoint } from "@/types/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MethodBadge } from "./method-badge"
import { ParametersTable } from "./parameters-table"
import { ExampleRequest } from "./example-request"
import { ApiTester } from "./api-tester"

interface ApiEndpointCardProps {
  endpoint: ApiEndpoint
}

export function ApiEndpointCard({ endpoint }: ApiEndpointCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-4">
          <MethodBadge method={endpoint.method} />
          <code className="text-sm">{endpoint.endpoint}</code>
        </div>
        <CardTitle className="text-xl mt-4">{endpoint.name}</CardTitle>
        <p className="text-muted-foreground">{endpoint.description}</p>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-3">Parameters</h3>
        <ParametersTable parameters={endpoint.parameters} />

        {/* {endpoint.example && <ExampleRequest example={endpoint.example} />} */}

        <h3 className="text-lg font-semibold mt-6 mb-3">Try it out</h3>
        <ApiTester endpoint={endpoint} />
      </CardContent>
    </Card>
  )
}