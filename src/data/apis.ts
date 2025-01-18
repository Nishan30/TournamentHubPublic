import { ApiCategory } from "@/types/api";
export const apis: ApiCategory[] = [
  {
    id: "blockchain-tournaments",
    name: "Blockchain Tournaments",
    description: "APIs for managing blockchain-based tournaments",
    sections: [
      {
        id: "tournament-api",
        name: "Tournament API",
        description: "Manage tournaments",
        endpoints: [
          {
            name: "Create Tournament",
            method: "POST",
            endpoint: "/api/soroban/tournament/create",
            description: "Create a new tournament",
            parameters: [
              { name: "name", type: "string", required: true, in: "body" },
              { name: "organizerName", type: "string", required: true, in: "body" },
              { name: "email", type: "string", required: true, in: "body" },
              { name: "description", type: "string", required: false, in: "body" },
              { name: "rules", type: "string", required: false, in: "body" },
              { name: "location", type: "string", required: false, in: "body" },
              { name: "playerCount", type: "number", required: false, in: "body" },
              { name: "tournamentType", type: "string", required: false, in: "body" },
              { name: "hasPlayerList", type: "boolean", required: false, in: "body" },
              { name: "needsArbriter", type: "boolean", required: false, in: "body" },
              { name: "isIndividual", type: "boolean", required: false, in: "body" },
              { name: "paymentSystem", type: "string", required: false, in: "body" },
              { name: "startDate", type: "string (ISO date)", required: false, in: "body" },
              { name: "endDate", type: "string (ISO date)", required: false, in: "body" },
            ],
            example: {
              name: "Spring Championship",
              organizerName: "ACME Sports",
              email: "contact@acmesports.com",
              description: "An annual spring tournament",
              rules: "Standard tournament rules apply",
              location: "Downtown Stadium",
              playerCount: 32,
              tournamentType: "Single Elimination",
              hasPlayerList: true,
              needsArbriter: false,
              isIndividual: true,
              paymentSystem: "PayPal",
              startDate: "2023-03-15T00:00:00Z",
              endDate: "2023-03-20T00:00:00Z",
            },
          },
          {
            name: "Get Tournament",
            method: "GET",
            endpoint: "/api/soroban/tournament/get",
            description: "Retrieve tournament(s) by ID or email",
            parameters: [
              { name: "id", type: "string", required: false, in: "query" },
              { name: "email", type: "string", required: false, in: "query" },
            ],
            example: {
              // Example for fetching by ID:
              id: "64f9e7b2b9e3f5a1c2d3e4f5",
              // Or example for fetching by email:
              // email: "user@example.com",
            },
          },
    
          // New "Update Tournament" endpoint
          {
            name: "Update Tournament",
            method: "PUT",
            endpoint: "/api/soroban/tournament/update",
            description: "Update details of an existing tournament",
            parameters: [
              { name: "id", type: "string", required: true, in: "body" },
              // Include only the fields you want to update:
              { name: "name", type: "string", required: false, in: "body" },
              { name: "organizerName", type: "string", required: false, in: "body" },
              { name: "email", type: "string", required: false, in: "body" },
              { name: "description", type: "string", required: false, in: "body" },
              { name: "rules", type: "string", required: false, in: "body" },
              { name: "location", type: "string", required: false, in: "body" },
              { name: "playerCount", type: "number", required: false, in: "body" },
              { name: "tournamentType", type: "string", required: false, in: "body" },
              { name: "hasPlayerList", type: "boolean", required: false, in: "body" },
              { name: "needsArbriter", type: "boolean", required: false, in: "body" },
              { name: "isIndividual", type: "boolean", required: false, in: "body" },
              { name: "paymentSystem", type: "string", required: false, in: "body" },
              { name: "startDate", type: "string (ISO date)", required: false, in: "body" },
              { name: "endDate", type: "string (ISO date)", required: false, in: "body" },
            ],
            example: {
              id: "64f9e7b2b9e3f5a1c2d3e4f5",
              name: "Updated Tournament Name",
              description: "An updated description for the tournament",
              playerCount: 64,
              startDate: "2023-04-01T00:00:00Z",
              endDate: "2023-04-05T00:00:00Z",
            },
          },
    
          // New "Delete Tournament" endpoint
          {
            name: "Delete Tournament",
            method: "DELETE",
            endpoint: "/api/soroban/tournament/delete",
            description: "Delete a tournament by ID",
            parameters: [
              { name: "id", type: "string", required: true, in: "query" },
            ],
            example: {
              id: "64f9e7b2b9e3f5a1c2d3e4f5",
            },
          },
        ],
      },
      {
        id: "participants-api",
        name: "Participants API",
        description: "Manage participants for tournaments",
        endpoints: [
          {
            name: "Create Participant",
            method: "POST",
            endpoint: "/api/soroban/tournament/participant/create",
            description: "Create a new participant for a tournament",
            parameters: [
              { name: "name", type: "string", required: true },
              { name: "email", type: "string", required: true },
              { name: "teamName", type: "string", required: false },
              { name: "questions", type: "string", required: false },
              { name: "walletAddress", type: "string", required: false },
              { name: "paymentDetails", type: "string", required: false },
              { name: "entryFeeDetails", type: "string", required: false },
              { name: "phoneNumber", type: "string", required: false },
              { name: "tournamentId", type: "string", required: true },
            ],
            example: {
              name: "John Doe",
              email: "john.doe@example.com",
              teamName: "Team Alpha",
              questions: "Can we participate remotely?",
              walletAddress: "0x1234567890abcdef",
              paymentDetails: "Paid via PayPal",
              entryFeeDetails: "Standard Entry",
              phoneNumber: "+123456789",
              tournamentId: "tournament123",
            },
          },
          {
            name: "Update Participant",
            method: "PUT",
            endpoint: "/api/soroban/tournament/participant/update",
            description: "Update details of an existing participant",
            parameters: [
              { name: "participantId", type: "string", required: true, in: "path" },
              { name: "updatedParticipantData", type: "object", required: true, in: "body" },
            ],
            example: {
              name: "John Doe",
              email: "john.doe@example.com",
              teamName: "Team Alpha",
              questions: "Can we participate remotely?",
              walletAddress: "0x1234567890abcdef",
              paymentDetails: "Paid via PayPal",
              entryFeeDetails: "Standard Entry",
              phoneNumber: "+123456789",
              tournamentId: "tournament123",
            },
          },
          {
            name: "Delete Participant",
            method: "DELETE",
            endpoint: "/api/soroban/tournament/participant/delete",
            description: "Delete a participant from a tournament",
            parameters: [
              { name: "participantId", type: "string", required: true, in: "body" },
            ],
          },
          {
            name: "Get Participant by Email",
            method: "GET",
            endpoint: "/api/soroban/participant/get",
            description: "Retrieve participant data by email",
            parameters: [
              {
                name: "email",
                type: "string",
                required: true,
                in: "query",
                description: "Email address of the participant",
              },
            ],
            example: {
              email: "participant@example.com",
            },
          },
          {
            name: "Get Participants by Tournament",
            method: "GET",
            endpoint: "/api/soroban/tournament/participant/get",
            description: "Fetch all participants for a specific tournament",
            parameters: [
              { name: "tournamentId", type: "string", required: true, in: "query"  },
            ],
          },
        ],
      },
      {
        id: "arbiters-api",
        name: "Arbiters API",
        description: "Manage arbiters for tournaments",
        endpoints: [
          {
            name: "Create Arbiter",
            method: "POST",
            endpoint: "/api/soroban/tournament/arbiter/create",
            description: "Create a new arbiter for a tournament",
            parameters: [
              { name: "name", type: "string", required: true},
              { name: "email", type: "string", required: true },
              { name: "questions", type: "string", required: false },
              { name: "walletAddress", type: "string", required: false },
              { name: "paymentDetails", type: "string", required: false },
              { name: "phoneNumber", type: "string", required: false },
              { name: "tournamentId", type: "string", required: true },
            ],
            example: {
              name: "Jane Doe",
              email: "jane.doe@example.com",
              questions: "What is the arbiter's role?",
              walletAddress: "0xabcdef1234567890",
              paymentDetails: "Bank Transfer",
              phoneNumber: "+987654321",
              tournamentId: "tournament456",
            },
          },
          {
            name: "Update Arbiter",
            method: "PUT",
            endpoint: "/api/soroban/tournament/arbiter/update",
            description: "Update details of an existing arbiter",
            parameters: [
              { name: "matchId", type: "string", required: true, in: "body" },
              { name: "updateData", type: "object", required: true, in: "body" },
            ],
            example: {
              name: "Jane Doe",
              email: "jane.doe@example.com",
              questions: "What is the arbiter's role?",
              walletAddress: "0xabcdef1234567890",
              paymentDetails: "Bank Transfer",
              phoneNumber: "+987654321",
              tournamentId: "tournament456",
            },
          },
          {
            name: "Delete Arbiter",
            method: "DELETE",
            endpoint: "/api/soroban/tournament/arbiter/delete",
            description: "Delete an arbiter from a tournament",
            parameters: [
              { name: "arbriterId", type: "string", required: true, in: "body" },
            ],
          },
          {
            name: "Get Arbiters by Email",
            method: "GET",
            endpoint: "/api/soroban/arbiter/get",
            description: "Retrieve arbiter data by email",
            parameters: [
              {
                name: "email",
                type: "string",
                required: true,
                in: "query",
                description: "Email address of the arbiter",
              },
            ],
            example: {
              email: "arbiter@example.com",
            },
          },
          {
            name: "Get Arbiters by Tournament",
            method: "GET",
            endpoint: "/api/soroban/tournament/arbiter/get",
            description: "Fetch all arbiters for a specific tournament",
            parameters: [
              { name: "tournamentId", type: "string", required: true, in: "query" },
            ],
          },
        ],
      },
      {
        id: "match-api",
        name: "Match API",
        description: "Manage tournaments and matches",
        endpoints: [
          {
            name: "Create Matches",
            method: "POST",
            endpoint: "/api/soroban/tournament/match/create",
            description: "Generate matches for a tournament based on its type and participants",
            parameters: [
              { name: "tournamentId", type: "string", required: true, in: "body" },
              { name: "groupSize", type: "number", required: false, in: "body", description: "Required for combination tournaments" },
              { name: "matchesPerDay", type: "number", required: true, in: "body" },
              { name: "rounds", type: "number", required: false, in: "body", description: "Required for swiss and custom-scoring tournaments" },
            ],
            example: {
              tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
              groupSize: 4,          // For combination tournaments
              matchesPerDay: 5,
              rounds: 3,             // For swiss and custom-scoring tournaments
            },
          },
    
          // New "Get Matches" endpoint
          {
            name: "Get Matches",
            method: "GET",
            endpoint: "/api/soroban/tournament/match/get",
            description: "Retrieve match(es) by match ID or tournament ID",
            parameters: [
              { name: "matchId", type: "string", required: false, in: "query", description: "ID of the specific match to retrieve" },
              { name: "tournamentId", type: "string", required: false, in: "query", description: "ID of the tournament to retrieve matches for" },
            ],
            example: {
              // Example for fetching by match ID:
              matchId: "650c2b3c9c4d2708f0e5a123",
              // Or example for fetching by tournament ID:
              // tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
            },
          },
    
          // New "Update Match" endpoint
          {
            name: "Update Match",
            method: "PUT",
            endpoint: "/api/soroban/tournament/match/update",
            description: "Update details of an existing match",
            parameters: [
              { name: "matchId", type: "string", required: true, in: "body", description: "ID of the match to update" },
              { name: "updateData", type: "object", required: true, in: "body", description: "Fields to update in the match" },
            ],
            example: {
              matchId: "650c2b3c9c4d2708f0e5a123",
              updateData: {
                status: "Complete",
                scores: [
                  { participantId: "participant1_id", score: 3 },
                  { participantId: "participant2_id", score: 2 },
                ],
                arbiterComment: "Great match between both teams.",
              },
            },
          },
    
          // New "Delete Match" endpoint
          {
            name: "Delete Match",
            method: "DELETE",
            endpoint: "/api/soroban/tournament/match/delete",
            description: "Delete a match by its ID",
            parameters: [
              { name: "matchId", type: "string", required: true, in: "body", description: "ID of the match to delete" },
            ],
            example: {
              matchId: "650c2b3c9c4d2708f0e5a123",
            },
          },
        ],
      },
      {
        id: "payment-settings-api",
        name: "Payment Settings API",
        description: "Manage payment settings for tournaments",
        endpoints: [
          // New "Get Payment Settings" endpoint
          {
            name: "Get Payment Settings",
            method: "GET",
            endpoint: "/api/soroban/tournament/paymentSystem/get",
            description: "Retrieve payment settings for a specific tournament",
            parameters: [
              {
                name: "tournamentId",
                type: "string",
                required: true,
                in: "query",
                description: "ID of the tournament",
              },
            ],
            example: {
              tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
            },
          },
    
          // New "Create or Update Payment Settings" endpoint
          {
            name: "Create or Update Payment Settings",
            method: "POST",
            endpoint: "/api/soroban/tournament/paymentSystem/create",
            description:
              "Create new payment settings or update existing settings for a tournament",
            parameters: [
              {
                name: "tournamentId",
                type: "string",
                required: true,
                in: "body",
                description: "ID of the tournament",
              },
              {
                name: "entryFee",
                type: "number",
                required: true,
                in: "body",
                description: "Entry fee amount for the tournament",
              },
              {
                name: "paymentTypes",
                type: "array of strings",
                required: true,
                in: "body",
                description:
                  "Accepted payment types (e.g., 'credit card', 'stellar', 'paypal')",
              },
              {
                name: "stellarTokenAddress",
                type: "string",
                required: false,
                in: "body",
                description:
                  "Stellar token address for payments (required if 'stellar' is in paymentTypes)",
              },
              {
                name: "walletAddress",
                type: "string",
                required: false,
                in: "body",
                description:
                  "Wallet address for payments (required if 'stellar' or 'crypto' is in paymentTypes)",
              },
              {
                name: "cardDetails",
                type: "object",
                required: false,
                in: "body",
                description:
                  "Payment card details (required if 'credit card' is in paymentTypes)",
              },
            ],
            example: {
              tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
              entryFee: 50.0,
              paymentTypes: ["credit card", "stellar"],
              stellarTokenAddress: "GA...TOKENADDRESS",
              walletAddress: "GC...WALLETADDRESS",
              cardDetails: {
                cardNumber: "4111111111111111",
                expiryDate: "12/24",
                cvv: "123",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "traditional-tournaments",
    name: "Traditional Tournaments",
    description: "APIs for managing traditional tournaments",
    sections: [
      {
        id: "tournament-api",
        name: "Tournament API",
        description: "Manage tournaments",
        endpoints: [
          {
            name: "Create Tournament",
            method: "POST",
            endpoint: "/api/tournament/create",
            description: "Create a new tournament",
            parameters: [
              { name: "name", type: "string", required: true, in: "body" },
              { name: "organizerName", type: "string", required: true, in: "body" },
              { name: "email", type: "string", required: true, in: "body" },
              { name: "description", type: "string", required: false, in: "body" },
              { name: "rules", type: "string", required: false, in: "body" },
              { name: "location", type: "string", required: false, in: "body" },
              { name: "playerCount", type: "number", required: false, in: "body" },
              { name: "tournamentType", type: "string", required: false, in: "body" },
              { name: "hasPlayerList", type: "boolean", required: false, in: "body" },
              { name: "needsArbriter", type: "boolean", required: false, in: "body" },
              { name: "isIndividual", type: "boolean", required: false, in: "body" },
              { name: "paymentSystem", type: "string", required: false, in: "body" },
              { name: "startDate", type: "string (ISO date)", required: false, in: "body" },
              { name: "endDate", type: "string (ISO date)", required: false, in: "body" },
            ],
            example: {
              name: "Spring Championship",
              organizerName: "ACME Sports",
              email: "contact@acmesports.com",
              description: "An annual spring tournament",
              rules: "Standard tournament rules apply",
              location: "Downtown Stadium",
              playerCount: 32,
              tournamentType: "Single Elimination",
              hasPlayerList: true,
              needsArbriter: false,
              isIndividual: true,
              paymentSystem: "PayPal",
              startDate: "2023-03-15T00:00:00Z",
              endDate: "2023-03-20T00:00:00Z",
            },
          },
          {
            name: "Get Tournament",
            method: "GET",
            endpoint: "/api/tournament/get",
            description: "Retrieve tournament(s) by ID or email",
            parameters: [
              { name: "id", type: "string", required: false, in: "query" },
              { name: "email", type: "string", required: false, in: "query" },
            ],
            example: {
              // Example for fetching by ID:
              id: "64f9e7b2b9e3f5a1c2d3e4f5",
              // Or example for fetching by email:
              // email: "user@example.com",
            },
          },
    
          // New "Update Tournament" endpoint
          {
            name: "Update Tournament",
            method: "PUT",
            endpoint: "/api/tournament/update",
            description: "Update details of an existing tournament",
            parameters: [
              { name: "id", type: "string", required: true, in: "body" },
              // Include only the fields you want to update:
              { name: "name", type: "string", required: false, in: "body" },
              { name: "organizerName", type: "string", required: false, in: "body" },
              { name: "email", type: "string", required: false, in: "body" },
              { name: "description", type: "string", required: false, in: "body" },
              { name: "rules", type: "string", required: false, in: "body" },
              { name: "location", type: "string", required: false, in: "body" },
              { name: "playerCount", type: "number", required: false, in: "body" },
              { name: "tournamentType", type: "string", required: false, in: "body" },
              { name: "hasPlayerList", type: "boolean", required: false, in: "body" },
              { name: "needsArbriter", type: "boolean", required: false, in: "body" },
              { name: "isIndividual", type: "boolean", required: false, in: "body" },
              { name: "paymentSystem", type: "string", required: false, in: "body" },
              { name: "startDate", type: "string (ISO date)", required: false, in: "body" },
              { name: "endDate", type: "string (ISO date)", required: false, in: "body" },
            ],
            example: {
              id: "64f9e7b2b9e3f5a1c2d3e4f5",
              name: "Updated Tournament Name",
              description: "An updated description for the tournament",
              playerCount: 64,
              startDate: "2023-04-01T00:00:00Z",
              endDate: "2023-04-05T00:00:00Z",
            },
          },
    
          // New "Delete Tournament" endpoint
          {
            name: "Delete Tournament",
            method: "DELETE",
            endpoint: "/api/tournament/delete",
            description: "Delete a tournament by ID",
            parameters: [
              { name: "id", type: "string", required: true, in: "query" },
            ],
            example: {
              id: "64f9e7b2b9e3f5a1c2d3e4f5",
            },
          },
        ],
      },
      {
        id: "participants-api",
        name: "Participants API",
        description: "Manage participants for tournaments",
        endpoints: [
          {
            name: "Create Participant",
            method: "POST",
            endpoint: "/api/tournament/participant/create",
            description: "Create a new participant for a tournament",
            parameters: [
              { name: "name", type: "string", required: true },
              { name: "email", type: "string", required: true },
              { name: "teamName", type: "string", required: false },
              { name: "questions", type: "string", required: false },
              { name: "walletAddress", type: "string", required: false },
              { name: "paymentDetails", type: "string", required: false },
              { name: "entryFeeDetails", type: "string", required: false },
              { name: "phoneNumber", type: "string", required: false },
              { name: "tournamentId", type: "string", required: true },
            ],
            example: {
              name: "John Doe",
              email: "john.doe@example.com",
              teamName: "Team Alpha",
              questions: "Can we participate remotely?",
              walletAddress: "0x1234567890abcdef",
              paymentDetails: "Paid via PayPal",
              entryFeeDetails: "Standard Entry",
              phoneNumber: "+123456789",
              tournamentId: "tournament123",
            },
          },
          {
            name: "Update Participant",
            method: "PUT",
            endpoint: "/api/tournament/participant/update",
            description: "Update details of an existing participant",
            parameters: [
              { name: "participantId", type: "string", required: true, in: "path" },
              { name: "updatedParticipantData", type: "object", required: true, in: "body" },
            ],
          },
          {
            name: "Delete Participant",
            method: "DELETE",
            endpoint: "/api/tournament/participant/delete",
            description: "Delete a participant from a tournament",
            parameters: [
              { name: "participantId", type: "string", required: true, in: "body" },
            ],
          },
          {
            name: "Get Participant by Email",
            method: "GET",
            endpoint: "/api/participants",
            description: "Retrieve participant data by email",
            parameters: [
              {
                name: "email",
                type: "string",
                required: true,
                in: "query",
                description: "Email address of the participant",
              },
            ],
            example: {
              email: "participant@example.com",
            },
          },
          {
            name: "Get Participants by Tournament",
            method: "GET",
            endpoint: "/api/tournament/participant/get",
            description: "Fetch all participants for a specific tournament",
            parameters: [
              { name: "tournamentId", type: "string", required: true, in: "query"  },
            ],
          },
        ],
      },
      {
        id: "arbiters-api",
        name: "Arbiters API",
        description: "Manage arbiters for tournaments",
        endpoints: [
          {
            name: "Create Arbiter",
            method: "POST",
            endpoint: "/api/tournament/arbiter/create",
            description: "Create a new arbiter for a tournament",
            parameters: [
              { name: "name", type: "string", required: true},
              { name: "email", type: "string", required: true },
              { name: "questions", type: "string", required: false },
              { name: "walletAddress", type: "string", required: false },
              { name: "paymentDetails", type: "string", required: false },
              { name: "phoneNumber", type: "string", required: false },
              { name: "tournamentId", type: "string", required: true },
            ],
            example: {
              name: "Jane Doe",
              email: "jane.doe@example.com",
              questions: "What is the arbiter's role?",
              walletAddress: "0xabcdef1234567890",
              paymentDetails: "Bank Transfer",
              phoneNumber: "+987654321",
              tournamentId: "tournament456",
            },
          },
          {
            name: "Update Arbiter",
            method: "PUT",
            endpoint: "/api/tournament/arbiter/update",
            description: "Update details of an existing arbiter",
            parameters: [
              { name: "matchId", type: "string", required: true, in: "body" },
              { name: "updateData", type: "object", required: true, in: "body" },
            ],
          },
          {
            name: "Delete Arbiter",
            method: "DELETE",
            endpoint: "/api/tournament/arbiter/delete",
            description: "Delete an arbiter from a tournament",
            parameters: [
              { name: "arbriterId", type: "string", required: true, in: "body" },
            ],
          },
          {
            name: "Get Arbiters by Email",
            method: "GET",
            endpoint: "/api/arbiter/get",
            description: "Retrieve arbiter data by email",
            parameters: [
              {
                name: "email",
                type: "string",
                required: true,
                in: "query",
                description: "Email address of the arbiter",
              },
            ],
            example: {
              email: "arbiter@example.com",
            },
          },
          {
            name: "Get Arbiters by Tournament",
            method: "GET",
            endpoint: "/api/tournament/arbiter/get",
            description: "Fetch all arbiters for a specific tournament",
            parameters: [
              { name: "tournamentId", type: "string", required: true, in: "query" },
            ],
          },
        ],
      },
      {
        id: "match-api",
        name: "Match API",
        description: "Manage tournaments and matches",
        endpoints: [
          {
            name: "Create Matches",
            method: "POST",
            endpoint: "/api/tournament/match/create",
            description: "Generate matches for a tournament based on its type and participants",
            parameters: [
              { name: "tournamentId", type: "string", required: true, in: "body" },
              { name: "groupSize", type: "number", required: false, in: "body", description: "Required for combination tournaments" },
              { name: "matchesPerDay", type: "number", required: true, in: "body" },
              { name: "rounds", type: "number", required: false, in: "body", description: "Required for swiss and custom-scoring tournaments" },
            ],
            example: {
              tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
              groupSize: 4,          // For combination tournaments
              matchesPerDay: 5,
              rounds: 3,             // For swiss and custom-scoring tournaments
            },
          },
    
          // New "Get Matches" endpoint
          {
            name: "Get Matches",
            method: "GET",
            endpoint: "/api/tournament/match/get",
            description: "Retrieve match(es) by match ID or tournament ID",
            parameters: [
              { name: "matchId", type: "string", required: false, in: "query", description: "ID of the specific match to retrieve" },
              { name: "tournamentId", type: "string", required: false, in: "query", description: "ID of the tournament to retrieve matches for" },
            ],
            example: {
              // Example for fetching by match ID:
              matchId: "650c2b3c9c4d2708f0e5a123",
              // Or example for fetching by tournament ID:
              // tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
            },
          },
    
          // New "Update Match" endpoint
          {
            name: "Update Match",
            method: "PUT",
            endpoint: "/api/tournament/match/update",
            description: "Update details of an existing match",
            parameters: [
              { name: "matchId", type: "string", required: true, in: "body", description: "ID of the match to update" },
              { name: "updateData", type: "object", required: true, in: "body", description: "Fields to update in the match" },
            ],
            example: {
              matchId: "650c2b3c9c4d2708f0e5a123",
              updateData: {
                status: "Complete",
                scores: [
                  { participantId: "participant1_id", score: 3 },
                  { participantId: "participant2_id", score: 2 },
                ],
                arbiterComment: "Great match between both teams.",
              },
            },
          },
    
          // New "Delete Match" endpoint
          {
            name: "Delete Match",
            method: "DELETE",
            endpoint: "/api/tournament/match/delete",
            description: "Delete a match by its ID",
            parameters: [
              { name: "matchId", type: "string", required: true, in: "body", description: "ID of the match to delete" },
            ],
            example: {
              matchId: "650c2b3c9c4d2708f0e5a123",
            },
          },
        ],
      },
      {
        id: "payment-settings-api",
        name: "Payment Settings API",
        description: "Manage payment settings for tournaments",
        endpoints: [
          // New "Get Payment Settings" endpoint
          {
            name: "Get Payment Settings",
            method: "GET",
            endpoint: "/api/tournament/paymentSystem/get",
            description: "Retrieve payment settings for a specific tournament",
            parameters: [
              {
                name: "tournamentId",
                type: "string",
                required: true,
                in: "query",
                description: "ID of the tournament",
              },
            ],
            example: {
              tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
            },
          },
    
          // New "Create or Update Payment Settings" endpoint
          {
            name: "Create or Update Payment Settings",
            method: "POST",
            endpoint: "/api/tournament/paymentSystem/create",
            description:
              "Create new payment settings or update existing settings for a tournament",
            parameters: [
              {
                name: "tournamentId",
                type: "string",
                required: true,
                in: "body",
                description: "ID of the tournament",
              },
              {
                name: "entryFee",
                type: "number",
                required: true,
                in: "body",
                description: "Entry fee amount for the tournament",
              },
              {
                name: "paymentTypes",
                type: "array of strings",
                required: true,
                in: "body",
                description:
                  "Accepted payment types (e.g., 'credit card', 'stellar', 'paypal')",
              },
              {
                name: "stellarTokenAddress",
                type: "string",
                required: false,
                in: "body",
                description:
                  "Stellar token address for payments (required if 'stellar' is in paymentTypes)",
              },
              {
                name: "walletAddress",
                type: "string",
                required: false,
                in: "body",
                description:
                  "Wallet address for payments (required if 'stellar' or 'crypto' is in paymentTypes)",
              },
              {
                name: "cardDetails",
                type: "object",
                required: false,
                in: "body",
                description:
                  "Payment card details (required if 'credit card' is in paymentTypes)",
              },
            ],
            example: {
              tournamentId: "64f9e7b2b9e3f5a1c2d3e4f5",
              entryFee: 50.0,
              paymentTypes: ["credit card", "stellar"],
              stellarTokenAddress: "GA...TOKENADDRESS",
              walletAddress: "GC...WALLETADDRESS",
              cardDetails: {
                cardNumber: "4111111111111111",
                expiryDate: "12/24",
                cvv: "123",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "sdks",
    name: "SDKs",
    description: "SDKs for integrating with various platforms",
    sections: [{
      id: "unity-sdk",
        name: "Unity SDK",
        description: "Integrate tournaments in your unity project",
        endpoints: []
    },
    {
      id: "unreal-sdk",
        name: "Unreal SDK",
        description: "Integrate tournaments in your Unreal project",
        endpoints: []
    },
    {
      id: "React-Native-sdk",
        name: "React Native SDK",
        description: "Integrate tournaments in your react native project",
        endpoints: []
    }
    ],
  },
];

