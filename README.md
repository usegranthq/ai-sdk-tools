# UseGrant AI SDK Tools

This is a set of [tools](https://ai-sdk.dev/docs/foundations/tools) for interacting with the UseGrant API using the [Vercel AI SDK](https://ai-sdk.dev/).

The tools are exported for convenience to interact with UseGrant from any AI SDK application. You can refer to
the source [src/generated/tools.gen.ts](./src/generated/tools.gen.ts) to copy the code and customize it for your needs.

## Requirements

- A valid UseGrant API key. Refer [here](https://usegrant.dev/docs/core/auth) for more details.

## Tools

The tools are generated from the [UseGrant OpenAPI spec](https://sdk.usegrant.dev/open-api.json) and call the
[UseGrant SDK](https://github.com/usegranthq/sdk), so every API operation is available as a tool. Tools are named after the
operation, for example:

- **providers_list**: List Providers
- **providers_clients_create**: Create Client
- **providers_domains_verify**: Verify Domain
- **tenants_providers_policies_create**: Create Tenant Provider Policy
- **tenants_tokens_validate**: Validate Token

Refer to [src/generated/tools.gen.ts](./src/generated/tools.gen.ts) for the full list. API errors are thrown as `UseGrantError`
from `@usegrant/sdk`, which the AI SDK reports to the model as a tool error.

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

## Contributing

The tools in `src/generated` are generated from the OpenAPI spec. After updating `@usegrant/sdk`, run `npm run generate`
to regenerate them, do not edit the generated files by hand.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
