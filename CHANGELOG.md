# @usegrant/ai-sdk-tools

## 2.0.0

### Major Changes

- 7321ab2: Generate the tools from the UseGrant OpenAPI spec with `@usegrant/sdk` v3

  - Every API operation is now available as a tool, named after the operation, for example `listProviders` is now `providers_list` and `createAccessToken` is now `providers_clients_tokens_create`
  - `validateAccessToken` is now `tenants_tokens_validate` and takes `tenantProviderPolicyId` and `token` instead of `policyId` and `accessToken`, and returns the API response
  - Delete tools return `<Operation> succeeded`, for example `Delete Client succeeded`
  - API errors are thrown as `UseGrantError` from `@usegrant/sdk`

## 1.2.0

### Minor Changes

- fe18401: Add tools for tenant provider policy api's

## 1.1.0

### Minor Changes

- 2ba5812: Add support for domain api's

### Patch Changes

- f18856b: Bump dependencies and devDependencies

## 1.0.0

### Major Changes

- 9cbc0f1: Initial release
