import { prisma } from "@/lib/prisma";

export async function GET() {
  const etudes = await prisma.planEdito.findMany({ take: 15 });
  return new Response(JSON.stringify(etudes), {
    headers: { "Content-Type": "application/json" },
  });
}
