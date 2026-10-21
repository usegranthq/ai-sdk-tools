---
'@usegrant/ai-sdk-tools': major
---

Generate the tools from the UseGrant OpenAPI spec with `@usegrant/sdk` v3

- Every API operation is now available as a tool, named after the operation, for example `listProviders` is now `providers_list` and `createAccessToken` is now `providers_clients_tokens_create`
- `validateAccessToken` is now `tenants_tokens_validate` and takes `tenantProviderPolicyId` and `token` instead of `policyId` and `accessToken`, and returns the API response
- Delete tools return `<Operation> succeeded`, for example `Delete Client succeeded`
- API errors are thrown as `UseGrantError` from `@usegrant/sdk`
