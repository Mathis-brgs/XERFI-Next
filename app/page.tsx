import { PanierClient } from "./components/PanierClient";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/etudes", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des études");
  }

  const etudes = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Liste des études</h1>
      <PanierClient etudes={etudes} />
    </main>
  );
}
