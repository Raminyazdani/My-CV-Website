interface ErrorFallbackProps {
  message: string;
}

export default function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <div className="text-red-500 p-4">
      {message}
    </div>
  )
} 