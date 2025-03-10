# UseGrant AI SDK Tools

This is a set of [tools](https://sdk.vercel.ai/docs/foundations/tools) for interacting with the UseGrant API using the [Vercel AI SDK](https://sdk.vercel.ai/).

The tooks are exported for convinience to interact with UseGrant from any AI SDK. You can refer to
the source [src/index.ts](./src/index.ts) to copy the code and customize it for your needs.

## Requirements

- A valid UseGrant API key. Refer [here](https://usegrant.dev/docs/authentication) for more details.

## Tools

- **listProviders**: List all providers
- **createProvider**: Create a new provider
- **getProvider**: Get a provider by ID
- **deleteProvider**: Delete a provider
- **listClients**: List all clients for a provider
- **createClient**: Create a new client for a provider
- **getClient**: Get client details by provider and client ID
- **deleteClient**: Delete a client from a provider
- **createAccessToken**: Create a new access token for a client
- **listTenants**: List all tenants
- **createTenant**: Create a new tenant
- **getTenant**: Get a tenant by ID
- **deleteTenant**: Delete a tenant
- **listTenantProviders**: List all providers for a tenant
- **createTenantProvider**: Create a new provider for a tenant
- **getTenantProvider**: Get a provider for a tenant
- **deleteTenantProvider**: Delete a provider for a tenant
- **validateAccessToken**: Validate an access token for a tenant

## Using with AI SDK

```js
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createTools } from '@usegrant/ai-sdk-tools';

const tools = createTools('usegrant_api_key');

const { text } = await generateText({
  model: anthropic('claude-3-5-haiku-latest'),
  prompt: 'Invent a new holiday and describe its traditions.',
  tools: {
    ...tools,
    // other tools
  },
});
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
