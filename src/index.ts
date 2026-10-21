import UseGrant, { client, createClient } from '@usegrant/sdk';

import { createUseGrantTools } from './generated/tools.gen.js';

export const createTools = (apiKey: string) => {
  if (!apiKey) {
    throw Error('Missing api key for UseGrant SDK');
  }

  // a client of its own, so the api key is not shared with other UseGrant instances
  const usegrant = new UseGrant({
    client: createClient({ ...client.getConfig(), auth: apiKey }),
  });

  return createUseGrantTools(usegrant);
};
