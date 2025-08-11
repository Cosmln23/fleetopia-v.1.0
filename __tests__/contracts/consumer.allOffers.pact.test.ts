import path from 'path';
import fetch from 'node-fetch';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const provider = new PactV3({
  consumer: 'fleetopia-web',
  provider: 'fleetopia-backend',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('Pact consumer: GET /api/marketplace/all-offers', () => {
  it('returns offers with pagination', async () => {
    provider
      .uponReceiving('a request for all offers page 1')
      .withRequest({
        method: 'GET',
        path: '/api/marketplace/all-offers',
        query: { page: '1', limit: '5' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: MatchersV3.like({
          cargo: MatchersV3.eachLike({
            id: MatchersV3.like('c_123'),
            title: MatchersV3.like('Electronics Shipment'),
            urgency: MatchersV3.like('medium'),
            price: MatchersV3.like(1850),
          }),
          pagination: MatchersV3.like({ total: 10, pages: 2, page: 1, limit: 5 }),
        }),
      });

    await provider.executeTest(async (mock) => {
      const res = await fetch(`${mock.url}/api/marketplace/all-offers?page=1&limit=5`);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(Array.isArray(json.cargo)).toBe(true);
      expect(json.pagination.total).toBeGreaterThanOrEqual(0);
    });
  });
});


