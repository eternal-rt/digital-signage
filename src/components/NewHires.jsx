import { useEffect, useState } from "react"
import bg from "../assets/backgrounds/newhires.png"

export default function NewHires() {
  const [data, setData] = useState([])
  const month = new Date().toLocaleDateString("en-US", { month: "long" })

  useEffect(() => {
    fetch("http://localhost:4000/api/newHires")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching new hires:", err))
  }, [])

  return (
    <div
      className="relative flex flex-col items-center justify-start h-screen w-screen text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Consistent overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

      {/* Auto-updating title */}
      <h1 className="relative text-6xl font-bold mt-10 text-center drop-shadow-lg z-10">
        👋 {month} New Hires!
      </h1>

      <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 max-w-4xl w-full px-8">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/40 rounded-2xl p-6 shadow-lg text-center"
            >
              <h2 className="text-3xl font-semibold mb-2">{item.name}</h2>
              <p className="text-xl opacity-80">{item.role}</p>
              {item.area && (
                <p className="text-lg opacity-70 mt-1">{item.area}</p>
              )}
              {item.hireDate && (
                <p className="text-lg opacity-70 mt-1">
                  {" "}
                  {new Date(item.hireDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-xl opacity-70 text-center">
            Pulled from 'NewHires' but nothing is listed!
          </p>
        )}
      </div>
    </div>
  )
}
