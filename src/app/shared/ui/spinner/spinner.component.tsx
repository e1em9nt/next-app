export function Spinner() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="animate-spin rounded-full h-15 w-15 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
