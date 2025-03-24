import { tool } from 'ai';
import { z } from 'zod';
import UseGrant from '@usegrant/sdk';
import * as UgSchema from '@usegrant/sdk/schema';

export const createTools = (apiKey: string) => {
  if (!apiKey) {
    throw Error('Missing api key for UseGrant SDK');
  }

  const sdk = (signal?: AbortSignal) => {
    return new UseGrant(apiKey, { signal });
  };

  return {
    listProviders: tool({
      description: 'List all providers',
      parameters: z.object({}),
      execute: async (_input, { abortSignal }) => {
        return sdk(abortSignal).listProviders();
      },
    }),
    createProvider: tool({
      description: 'Create a new provider',
      parameters: UgSchema.CreateProviderSchema,
      execute: async (args, { abortSignal }) => {
        return sdk(abortSignal).createProvider(args);
      },
    }),
    getProvider: tool({
      description: 'Get a provider by ID',
      parameters: z.object({ id: UgSchema.ProviderIdSchema }),
      execute: async ({ id }, { abortSignal }) => {
        return sdk(abortSignal).getProvider(id);
      },
    }),
    deleteProvider: tool({
      description: 'Delete a provider',
      parameters: z.object({ id: UgSchema.ProviderIdSchema }),
      execute: async ({ id }, { abortSignal }) => {
        await sdk(abortSignal).deleteProvider(id);
        return `Provider ${id} deleted`;
      },
    }),
    listClients: tool({
      description: 'List all clients',
      parameters: z.object({ providerId: UgSchema.ProviderIdSchema }),
      execute: async ({ providerId }, { abortSignal }) => {
        return sdk(abortSignal).listClients(providerId);
      },
    }),
    createClient: tool({
      description: 'Create a new client for a provider',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        ...UgSchema.CreateClientSchema.shape,
      }),
      execute: async ({ providerId, ...payload }, { abortSignal }) => {
        return sdk(abortSignal).createClient(providerId, payload);
      },
    }),
    getClient: tool({
      description: 'Get client details by provider and client ID',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        clientId: UgSchema.ClientIdSchema,
      }),
      execute: async ({ providerId, clientId }, { abortSignal }) => {
        return sdk(abortSignal).getClient(providerId, clientId);
      },
    }),
    deleteClient: tool({
      description: 'Delete a client from a provider',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        clientId: UgSchema.ClientIdSchema,
      }),
      execute: async ({ providerId, clientId }, { abortSignal }) => {
        await sdk(abortSignal).deleteClient(providerId, clientId);
        return `Client ${clientId} deleted`;
      },
    }),
    listDomains: tool({
      description: 'List all domains for a provider',
      parameters: z.object({ providerId: UgSchema.ProviderIdSchema }),
      execute: async ({ providerId }, { abortSignal }) => {
        return sdk(abortSignal).listDomains(providerId);
      },
    }),
    addDomain: tool({
      description: 'Add a new domain for a provider',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        domain: UgSchema.AddDomainSchema.shape.domain,
      }),
      execute: async ({ providerId, domain }, { abortSignal }) => {
        return sdk(abortSignal).addDomain(providerId, { domain });
      },
    }),
    getDomain: tool({
      description: 'Get a domain by provider and domain ID',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        domainId: UgSchema.DomainIdSchema,
      }),
      execute: async ({ providerId, domainId }, { abortSignal }) => {
        return sdk(abortSignal).getDomain(providerId, domainId);
      },
    }),
    deleteDomain: tool({
      description: 'Delete a domain by provider and domain ID',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        domainId: UgSchema.DomainIdSchema,
      }),
      execute: async ({ providerId, domainId }, { abortSignal }) => {
        await sdk(abortSignal).deleteDomain(providerId, domainId);
        return `Domain ${domainId} deleted`;
      },
    }),
    verifyDomain: tool({
      description: 'Verify a domain by provider and domain ID',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        domainId: UgSchema.DomainIdSchema,
      }),
      execute: async ({ providerId, domainId }, { abortSignal }) => {
        return await sdk(abortSignal).verifyDomain(providerId, domainId);
      },
    }),
    createAccessToken: tool({
      description: 'Create a new access token for a client',
      parameters: z.object({
        providerId: UgSchema.ProviderIdSchema,
        clientId: UgSchema.ClientIdSchema,
        ...UgSchema.CreateTokenSchema.shape,
      }),
      execute: async ({ providerId, clientId, ...payload }, { abortSignal }) => {
        return sdk(abortSignal).createToken(providerId, clientId, payload);
      },
    }),
    listTenants: tool({
      description: 'List all tenants',
      parameters: z.object({}),
      execute: async (_input, { abortSignal }) => {
        return sdk(abortSignal).listTenants();
      },
    }),
    createTenant: tool({
      description: 'Create a new tenant',
      parameters: UgSchema.CreateTenantSchema,
      execute: async (payload, { abortSignal }) => {
        return sdk(abortSignal).createTenant(payload);
      },
    }),
    getTenant: tool({
      description: 'Get a tenant by ID',
      parameters: z.object({ id: UgSchema.TenantIdSchema }),
      execute: async ({ id }, { abortSignal }) => {
        return sdk(abortSignal).getTenant(id);
      },
    }),
    deleteTenant: tool({
      description: 'Delete a tenant',
      parameters: z.object({ id: UgSchema.TenantIdSchema }),
      execute: async ({ id }, { abortSignal }) => {
        await sdk(abortSignal).deleteTenant(id);
        return `Tenant ${id} deleted`;
      },
    }),
    listTenantProviders: tool({
      description: 'List all providers for a tenant',
      parameters: z.object({ tenantId: UgSchema.TenantIdSchema }),
      execute: async ({ tenantId }, { abortSignal }) => {
        return sdk(abortSignal).listTenantProviders(tenantId);
      },
    }),
    createTenantProvider: tool({
      description: 'Create a new provider for a tenant',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        ...UgSchema.CreateTenantProviderSchema.shape,
      }),
      execute: async ({ tenantId, ...payload }, { abortSignal }) => {
        return sdk(abortSignal).createTenantProvider(tenantId, payload);
      },
    }),
    getTenantProvider: tool({
      description: 'Get a provider for a tenant',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        providerId: UgSchema.TenantProviderIdSchema,
      }),
      execute: async ({ tenantId, providerId }, { abortSignal }) => {
        return sdk(abortSignal).getTenantProvider(tenantId, providerId);
      },
    }),
    deleteTenantProvider: tool({
      description: 'Delete a provider for a tenant',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        providerId: UgSchema.TenantProviderIdSchema,
      }),
      execute: async ({ tenantId, providerId }, { abortSignal }) => {
        await sdk(abortSignal).deleteTenantProvider(tenantId, providerId);
        return `Tenant provider ${providerId} deleted`;
      },
    }),
    listTenantProviderPolicies: tool({
      description: 'List all policies for a tenant provider',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        providerId: UgSchema.TenantProviderIdSchema,
      }),
      execute: async ({ tenantId, providerId }, { abortSignal }) => {
        return sdk(abortSignal).listTenantProviderPolicies(tenantId, providerId);
      },
    }),
    createTenantProviderPolicy: tool({
      description: 'Create a new policy for a tenant provider',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        providerId: UgSchema.TenantProviderIdSchema,
        ...UgSchema.CreateTenantProviderPolicySchema.shape,
      }),
      execute: async ({ tenantId, providerId, ...payload }, { abortSignal }) => {
        return sdk(abortSignal).createTenantProviderPolicy(tenantId, providerId, payload);
      },
    }),
    getTenantProviderPolicy: tool({
      description: 'Get a policy for a tenant provider',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        providerId: UgSchema.TenantProviderIdSchema,
        policyId: UgSchema.TenantProviderPolicyIdSchema,
      }),
      execute: async ({ tenantId, providerId, policyId }, { abortSignal }) => {
        return sdk(abortSignal).getTenantProviderPolicy(tenantId, providerId, policyId);
      },
    }),
    deleteTenantProviderPolicy: tool({
      description: 'Delete a policy for a tenant provider',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        providerId: UgSchema.TenantProviderIdSchema,
        policyId: UgSchema.TenantProviderPolicyIdSchema,
      }),
      execute: async ({ tenantId, providerId, policyId }, { abortSignal }) => {
        await sdk(abortSignal).deleteTenantProviderPolicy(tenantId, providerId, policyId);
        return `Tenant provider policy ${policyId} deleted`;
      },
    }),
    validateAccessToken: tool({
      description: 'Validate an access token',
      parameters: z.object({
        tenantId: UgSchema.TenantIdSchema,
        policyId: UgSchema.TenantProviderPolicyIdSchema,
        accessToken: z.string(),
      }),
      execute: async ({ tenantId, policyId, accessToken }, { abortSignal }) => {
        const { exp } = await sdk(abortSignal).validateToken(tenantId, policyId, accessToken);

        return {
          isValid: true,
          exp,
        };
      },
    }),
  };
};
