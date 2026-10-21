# UseGrant AI SDK Tools

This is a set of [tools](https://ai-sdk.dev/docs/foundations/tools) for interacting with the UseGrant API using the [Vercel AI SDK](https://ai-sdk.dev/).

The tools are exported for convenience to interact with UseGrant from any AI SDK application. You can refer to
the source [src/index.ts](./src/index.ts) to copy the code and customize it for your needs.

## Requirements

- A valid UseGrant API key. Refer [here](https://usegrant.dev/docs/core/auth) for more details.

## Tools

- **listProviders**: List all providers
- **createProvider**: Create a new provider
- **getProvider**: Get a provider by ID
- **deleteProvider**: Delete a provider
- **listClients**: List all clients for a provider
- **createClient**: Create a new client for a provider
- **getClient**: Get client details by provider and client ID
- **deleteClient**: Delete a client from a provider
- **listDomains**: List all domains for a provider
- **addDomain**: Add a new domain for a provider
- **getDomain**: Get a domain by provider and domain ID
- **deleteDomain**: Delete a domain by provider and domain ID
- **verifyDomain**: Verify a domain by provider and domain ID
- **createAccessToken**: Create a new access token for a client
- **listTenants**: List all tenants
- **createTenant**: Create a new tenant
- **getTenant**: Get a tenant by ID
- **deleteTenant**: Delete a tenant
- **listTenantProviders**: List all providers for a tenant
- **createTenantProvider**: Create a new provider for a tenant
- **getTenantProvider**: Get a provider for a tenant
- **deleteTenantProvider**: Delete a provider for a tenant
- **listTenantProviderPolicies**: List all policies for a tenant provider
- **createTenantProviderPolicy**: Create a new policy for a tenant provider
- **getTenantProviderPolicy**: Get a policy for a tenant provider
- **deleteTenantProviderPolicy**: Delete a policy for a tenant provider
- **validateAccessToken**: Validate an access token against a tenant provider policy

## Using with AI SDK

```js
import { generateText, isStepCount } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createTools } from '@usegrant/ai-sdk-tools';

const tools = createTools('usegrant_api_key');

const { text } = await generateText({
  model: anthropic('claude-haiku-5-5'),
  prompt: 'List my UseGrant providers and their clients.',
  tools: {
    ...tools,
    // other tools
  },
  // let the model answer after calling the tools
  stopWhen: isStepCount(5),
});
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
