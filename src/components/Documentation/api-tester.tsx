"use client"

import { useState } from "react"
import { Editor } from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { ParameterEditor } from "./parameter-editor"
import { ApiEndpoint } from "@/types/api"
import axios from "axios"

interface ApiTesterProps {
  endpoint: ApiEndpoint
}

export function ApiTester({ endpoint }: ApiTesterProps) {
  const [response, setResponse] = useState<string>("")
  const [requestBody, setRequestBody] = useState<string>(
    endpoint.example ? JSON.stringify(endpoint.example, null, 2) : "{}"
  )
  const [paramValues, setParamValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const handleTest = async () => {
    try {
      setLoading(true)
      const parsedBody = requestBody ? JSON.parse(requestBody) : {}

      // Replace path parameters in the URL
      let url = endpoint.endpoint
      endpoint.parameters
        .filter((p) => p.in === "query")
        .forEach((param) => {
          if (!paramValues[param.name]) {
            throw new Error(`Missing value for path parameter: ${param.name}`)
          }
          url = url.replace(`{${param.name}}`, paramValues[param.name])
        })
        console.log(endpoint.parameters);

        console.log(url);

      // Collect query parameters
      const queryParams = endpoint.parameters
        .filter((p) => p.in === "body")
        .reduce((acc, param) => {
          if (paramValues[param.name]) {
            acc[param.name] = paramValues[param.name]
          }
          return acc
        }, {} as Record<string, string>)

      const res = await axios({
        method: endpoint.method.toLowerCase(),
        url,
        params: queryParams,
        ...(endpoint.method.toLowerCase() !== "get" && { data: parsedBody }),
      })
      setResponse(JSON.stringify(res.data, null, 2))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponse(JSON.stringify(error.response?.data || error.message, null, 2))
      } else {
        setResponse(JSON.stringify({ message: "An unknown error occurred" }, null, 2))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Parameters</h4>
        <ParameterEditor
          parameters={endpoint.parameters.filter(
            (param) => param.in === "query"
          )}
          values={paramValues}
          onChange={setParamValues}
        />
      </div>

      {endpoint.method.toLowerCase() !== "get" && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Request Body</h4>
          <Editor
            height="200px"
            defaultLanguage="json"
            value={requestBody}
            onChange={(value) => setRequestBody(value ?? "{}")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      )}

      <Button onClick={handleTest} disabled={loading}>
        {loading ? "Testing..." : "Test API"}
      </Button>

      {response && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Response</h4>
          <Editor
            height="200px"
            defaultLanguage="json"
            value={response}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      )}
    </div>
  )
}