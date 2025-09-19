import { useEffect, useState } from "react"
import bg from "../assets/backgrounds/announcements.png"

export default function Announcements() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/api/announcements")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching announcements:", err))
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
       🔭 Looking Ahead!
      </h1>

  
      <div className="relative z-10 mt-10 bg-black/40 rounded-2xl p-8 shadow-lg w-3/4 max-w-4xl">
        {data.length > 0 ? (
          <ul className="space-y-6 text-2xl">
            {data.map((a, idx) => (
              <li
                key={idx}
                className="border-b border-white/20 pb-4 last:border-0"
              >
      
                <p className="font-bold text-3xl">{a.title}</p>

                
                {a.details && a.details.trim().toUpperCase() !== "N/A" && (
                  <p className="text-lg opacity-80 mt-1">{a.details}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl opacity-70 text-center">
            Pulled from 'Annoucements' but theres nothing listed!
          </p>
        )}
      </div>
    </div>
  )
}
