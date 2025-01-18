// pages/docs.tsx

import { Sidebar } from "@/components/Documentation/sidebar"
import { ApiEndpointCard } from "@/components/Documentation/api-endpoint"
import { apis } from "@/data/apis"


export default function DocsPage() {
  function generateId(sectionId: string, endpointName: string): string {
    return `${sectionId}-${endpointName}`
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '')
      .toLowerCase()
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar apis={apis} />
      <main className="flex-1 pl-64 ml-4 p-8">
        {/* Authentication Section */}
        <section id="authentication" className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Authentication</h1>
          <p className="text-muted-foreground mb-6">
            To authenticate your API requests, include the `Authorization` header with the value `Bearer-CLIENT_SECRET_KEY` in your requests. Replace `CLIENT_SECRET_KEY` with your actual client secret key, which you can obtain from the <strong>API Keys</strong> page of your tournament dashboard.
          </p>
          <div className="bg-neutral-900 p-4 rounded-md mb-4">
            <pre className="text-white overflow-x-auto">
{`Authorization: Bearer-CLIENT_SECRET_KEY`}
            </pre>
          </div>
        </section>

        {/* Existing API Documentation */}
        {apis.map((category) => (
          <div key={category.id} id={category.id} className="mb-16">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-muted-foreground mb-6">{category.description}</p>
            )}

            {category.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="text-3xl font-bold mb-4">{section.name}</h2>
                {section.description && (
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                )}

                {section.endpoints.map((endpoint) => (
                  <div
                    key={endpoint.endpoint}
                    id={generateId(section.id, endpoint.name)}
                    className="mb-8"
                  >
                    <ApiEndpointCard endpoint={endpoint} />
                  </div>
                ))}
              </section>
            ))}
          </div>
        ))}
      </main>
    </div>
  )
}