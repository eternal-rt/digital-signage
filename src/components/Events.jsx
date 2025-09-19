import { useEffect, useState } from "react"
import bg from "../assets/backgrounds/events.png"

export default function Events() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/api/events")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching events:", err))
  }, [])

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-start text-white font-hybrea"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

     
      <h1 className="relative text-6xl font-bold mt-12 text-center drop-shadow-lg z-10">
        Upcoming Events
      </h1>

      
      <div className="relative z-10 mt-10 bg-black/40 rounded-2xl p-8 shadow-lg w-3/4 max-w-4xl">
        {data.length > 0 ? (
          <ul className="space-y-6 text-2xl">
            {data.map((e, idx) => (
              <li
                key={idx}
                className="border-b border-white/20 pb-4 last:border-0"
              >
                <p className="font-bold text-3xl">{e.title}</p>
                <p className="opacity-80">
                  {e.date
                    ? new Date(e.date).toLocaleString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "Date not set"}
                </p>
                {e.location && (
                  <p className="text-lg opacity-70 mt-1">{e.location}</p>
                )}
                {e.description && (
                  <p className="text-lg opacity-80 mt-2">{e.description}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl opacity-70 text-center">Pulled from 'Events' but theres nothing listed!</p>
        )}
      </div>
    </div>
  )
}
