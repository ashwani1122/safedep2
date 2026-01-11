"use server";

import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

const authInterceptor: any = (next: any) => async (req: any) => {
  req.header.set("authorization", process.env.SAFEDEP_API_KEY!);
  req.header.set("x-tenant-id", process.env.SAFEDEP_TENANT_ID!);
  return await next(req);
};

const transport = createConnectTransport({
  baseUrl: "https://api.safedep.io",
  httpVersion: "1.1",
  interceptors: [authInterceptor],
});

const client = createClient(InsightService, transport);

/**
 * @param ecosystem - The string key of the ecosystem (e.g., "NPM", "PYPI", "CARGO")
 */
export async function getPackageInsight(ecosystem: string, name: string, version: string) {
  try {
    // Convert string input (e.g., "NPM") to the Enum value required by the Proto
    // We handle the case-insensitive mapping here
    const ecoKey = ecosystem.toUpperCase() as keyof typeof Ecosystem;
    const selectedEcosystem = Ecosystem[ecoKey] ?? Ecosystem.UNSPECIFIED;

    const res = await client.getPackageVersionInsight({
      packageVersion: {
        package: {
          ecosystem: selectedEcosystem,
          name: name,
        },
        version: version,
      },
    });

    return { data: res.toJson(), error: null };
  } catch (err) {
    console.error("SafeDep Insight Error:", err);
    return { data: null, error: "Failed to fetch package data." };
  }
}