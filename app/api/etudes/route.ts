import { prisma } from "@/lib/prisma";

export async function GET() {
  const etudes = await prisma.planEdito.findMany({ take: 35 });
  await new Promise((resolve) => setTimeout(resolve, 500));
  return new Response(JSON.stringify(etudes), {
    headers: { "Content-Type": "application/json" },
  });
}
