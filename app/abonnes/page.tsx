"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Alert } from "../components/ui/alert";
import { useRouter } from "next/navigation";

export default function AbonneLoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/loginAbonne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (res.status === 403) {
        setError("Cet utilisateur n'est pas un abonné.");
        setToken(null);
        return;
      }

      if (!res.ok || data.error) {
        setError(data.error || "Erreur inconnue");
        setToken(null);
        return;
      }

      setToken(data.token);
      localStorage.setItem("token", data.token);
      setSuccessMessage("Connexion réussie !");
      router.push("/");
    } catch {
      setError("Erreur réseau");
      setToken(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Identifiez-vous pour accéder à votre espace abonné
        </h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert
            variant="default"
            className="mb-4 text-green-700 bg-green-100 border border-green-300"
          >
            {successMessage}
          </Alert>
        )}

        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Se connecter</Button>
        </div>
        {token && (
          <p /*className="mt-4 text-sm text-gray-600 break-all"*/>
            {/* Token (debug) : {token} */}
          </p>
        )}
      </div>
    </div>
  );
}
