export async function GET() {
  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env["NODE_ENV"] || "development",
    version: process.env["npm_package_version"] || "0.0.1",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
  };

  return new Response(JSON.stringify(healthData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
