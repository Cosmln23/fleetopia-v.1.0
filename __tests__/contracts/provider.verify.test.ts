import path from 'path';
import { Verifier } from '@pact-foundation/pact';

describe('Pact provider verification', () => {
  it('verifies pacts for fleetopia-backend', async () => {
    const pactPath = path.resolve(process.cwd(), 'pacts', 'fleetopia-web-fleetopia-backend.json');
    const verifier = new Verifier({
      providerBaseUrl: process.env.PROVIDER_BASE_URL || 'http://localhost:3001',
      pactUrls: [pactPath],
      publishVerificationResult: false,
      providerVersion: process.env.GITHUB_SHA || 'dev-local',
    });
    await verifier.verifyProvider();
  }, 30000);
});


