"use client"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type ChatMessageProps = {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? "ml-2" : "mr-2"} ${isUser ? "bg-purple-100" : "bg-gray-100"}`}
        >
          {isUser ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user text-purple-600"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bot text-gray-600"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          )}
        </div>

        <div className="flex flex-col">
          <div className={`px-4 py-2 rounded-lg ${isUser ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800"}`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

