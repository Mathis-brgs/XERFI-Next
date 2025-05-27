"use client";

import Image from "next/image";
import { useState } from "react";

type Etude = {
  IDPLAN_EDITO: number;
  Titre_Etude: string;
  Prix_Spot: number;
  Balise_alt: string;
  Code_titre: string;
};

type PanierClientProps = {
  etudes: Etude[];
};

export function PanierClient({ etudes }: PanierClientProps) {
  const [panier, setPanier] = useState<number[]>([]);

  const togglePanier = (id: number) => {
    if (panier.includes(id)) {
      setPanier(panier.filter((item) => item !== id));
    } else {
      setPanier([...panier, id]);
    }
  };

  return (
    <>
      <ul className="flex flex-wrap gap-4 justify-center">
        {etudes.map((e) => (
          <li
            key={e.IDPLAN_EDITO}
            className="w-72 h-42 border p-4 rounded shadow bg-white flex flex-col justify-between"
          >
            <div className="flex flex-row gap-2 justify-start items-center">
              <Image
                src={`https://www.xerfi.com/IMAGESSITE/ETUDES/${e.Code_titre}_2.jpg`}
                alt={e.Balise_alt}
                width={70}
                height={70}
                className="object-contain rounded-full"
              />

              <div className="font-bold text-sm">{e.Titre_Etude}</div>
            </div>
            <div className="text-right font-semibold">{e.Prix_Spot} €</div>
            <button
              onClick={() => togglePanier(e.IDPLAN_EDITO)}
              className={`mt-2 px-3 py-1 rounded text-white ${
                panier.includes(e.IDPLAN_EDITO)
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {panier.includes(e.IDPLAN_EDITO)
                ? "Retirer du panier"
                : "Ajouter au panier"}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Panier ({panier.length})</h2>
        {panier.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul>
            {panier.map((id) => {
              const etude = etudes.find((e) => e.IDPLAN_EDITO === id);
              return (
                <li key={id} className="mb-2">
                  {etude?.Titre_Etude} - {etude?.Prix_Spot} €
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
