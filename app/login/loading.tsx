export default function LoadingLogin() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Chargement...</h1>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </main>
  );
}
