import { useEffect, useState } from "react"
import bg from "../assets/backgrounds/message.png"

export default function Message() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:4000/api/message")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading message:", err))
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    )
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen w-screen text-white text-center px-8"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

      
      <div className="relative z-10 flex flex-col items-center max-w-6xl">
        <h1 className="text-7xl font-bold mb-8 drop-shadow-lg">
          {data.title}
        </h1>
        <p className="text-4xl leading-snug drop-shadow-lg">{data.content}</p>
      </div>
    </div>
  )
}
