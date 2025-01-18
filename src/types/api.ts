export interface Parameter {
  name: string
  type: string
  required: boolean
  description?:string
  in?: string
}

export interface ApiEndpoint {
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  description: string
  parameters: Parameter[]
  example?: Record<string, any>
}

export interface ApiCategory {
  id: string;
  name: string;
  description?: string;
  sections: ApiSection[];
}

export interface ApiSection {
  id: string
  name: string
  description: string
  endpoints: ApiEndpoint[]
}