import { prisma } from "../lib/prisma";
import { PanierClient } from "./components/PanierClient";

export default async function Home() {
  const etudes = await prisma.planEdito.findMany({
    select: {
      IDPLAN_EDITO: true,
      Titre_Etude: true,
      Prix_Spot: true,
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Liste des études</h1>
      <PanierClient etudes={etudes} />
    </main>
  );
}
