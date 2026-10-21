import { UseGrantError } from '@usegrant/sdk';
import { asSchema, type ToolExecutionOptions } from 'ai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createTools } from './index.js';

const options: ToolExecutionOptions<Record<string, unknown>> = {
  toolCallId: 'call-1',
  messages: [],
  context: {},
};

describe('createTools', () => {
  const fetchMock = vi.fn<typeof fetch>();
  let requests: Request[];

  beforeEach(() => {
    fetchMock.mockReset();
    requests = [];
    // keep a copy of the requests, the body of the original is read when sending it
    vi.stubGlobal('fetch', (input: Request, init?: RequestInit) => {
      requests.push(input.clone());
      return fetchMock(input, init);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const lastRequest = () => requests[requests.length - 1];

  it('should throw without an api key', () => {
    expect(() => createTools('')).toThrow('Missing api key for UseGrant SDK');
  });

  it('should create a tool per operation named after the operationId', () => {
    const tools = createTools('test-api-key');

    expect(Object.keys(tools)).toHaveLength(27);
    expect(tools).toHaveProperty('providers_clients_create');
    expect(tools).toHaveProperty('tenants_tokens_validate');
    expect(tools.providers_clients_create.description).toBe('Create Client');
  });

  it('should combine path parameters and body fields in the input schema', async () => {
    const { jsonSchema } = asSchema(
      createTools('test-api-key').providers_clients_create.inputSchema,
    );

    expect(await jsonSchema).toMatchObject({
      type: 'object',
      properties: {
        providerId: { type: 'string', description: 'Provider ID' },
        name: { type: 'string' },
        audience: { type: 'string' },
      },
      required: ['providerId', 'name', 'audience'],
    });
  });

  it('should call the API with the path parameters, body and api key', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json(
        {
          id: 'client-123',
          name: 'My Client',
          audience: 'my-audience',
          subject: 'subject',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
          providerId: 'p-123',
        },
        { status: 201 },
      ),
    );

    const result = await createTools('test-api-key').providers_clients_create.execute!(
      { providerId: 'p-123', name: 'My Client', audience: 'my-audience' },
      options,
    );

    const request = lastRequest();
    expect(request.method).toBe('POST');
    expect(request.url).toBe('https://sdk.usegrant.dev/v1/providers/p-123/clients');
    expect(request.headers.get('Authorization')).toBe('Bearer test-api-key');
    expect(await request.json()).toEqual({ name: 'My Client', audience: 'my-audience' });
    expect(result).toMatchObject({ id: 'client-123', name: 'My Client' });
  });

  it('should report success for operations without a response body', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }));

    const result = await createTools('test-api-key').providers_clients_delete.execute!(
      { providerId: 'p-123', clientId: 'client-123' },
      options,
    );

    expect(lastRequest().method).toBe('DELETE');
    expect(lastRequest().url).toBe(
      'https://sdk.usegrant.dev/v1/providers/p-123/clients/client-123',
    );
    expect(result).toBe('Delete Client succeeded');
  });

  it('should throw API errors as UseGrantError', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json(
        { code: 'PROVIDER_NOT_FOUND', message: 'The specified provider could not be found' },
        { status: 404 },
      ),
    );

    const result = createTools('test-api-key').providers_clients_list.execute!(
      { providerId: 'p-404' },
      options,
    );

    await expect(result).rejects.toBeInstanceOf(UseGrantError);
    await expect(result).rejects.toMatchObject({
      status: 404,
      code: 'PROVIDER_NOT_FOUND',
      message: 'The specified provider could not be found',
    });
  });

  it('should not share the api key between tool sets', async () => {
    fetchMock.mockImplementation(async () => Response.json([]));
    const first = createTools('first-api-key');
    const second = createTools('second-api-key');

    await first.providers_list.execute!({}, options);
    expect(lastRequest().headers.get('Authorization')).toBe('Bearer first-api-key');

    await second.providers_list.execute!({}, options);
    expect(lastRequest().headers.get('Authorization')).toBe('Bearer second-api-key');
  });
});
