export function Spinner() {
  return (
    <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
      <div className='h-15 w-15 animate-spin rounded-full border-t-2 border-b-2 border-gray-900'></div>
    </div>
  )
}
