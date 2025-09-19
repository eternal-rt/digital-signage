import { useEffect, useState } from "react"
import locations from "../data/weatherLocations.json"
import bg from "../assets/backgrounds/weather.png"

export default function Weather() {
  const [weatherData, setWeatherData] = useState({})
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    async function fetchWeather() {
      const results = {}

      for (const loc of locations) {
        try {
          const currentRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              loc.city + ",US"
            )}&units=imperial&appid=${apiKey}`
          )
          const current = await currentRes.json()

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
              loc.city + ",US"
            )}&units=imperial&appid=${apiKey}`
          )
          const forecast = await forecastRes.json()

          if (current.cod !== 200 || forecast.cod !== "200") {
            results[loc.city] = { error: true }
            continue
          }

          const daily = []
          const seenDates = new Set()
          for (let f of forecast.list) {
            const date = f.dt_txt.split(" ")[0]
            if (!seenDates.has(date) && f.dt_txt.includes("12:00:00")) {
              seenDates.add(date)
              daily.push({
                date,
                temp: f.main.temp,
                condition: f.weather[0].description,
                icon: f.weather[0].icon,
              })
            }
          }

          results[loc.city] = {
            current: {
              temp: current.main?.temp,
              condition: current.weather?.[0]?.description,
              icon: current.weather?.[0]?.icon,
            },
            forecast: daily,
          }
        } catch (e) {
          console.error("Error fetching weather:", e)
        }
      }

      setWeatherData(results)
    }

    fetchWeather()
  }, [apiKey])

  const getIconUrl = (icon) =>
    icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ""

  return (
    <div
      className="relative flex h-screen w-screen text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      <div className="relative z-10 flex w-full h-full p-8 gap-8">
        <div className="flex-1 flex flex-col">
          <h1 className="text-6xl font-bold mb-8 drop-shadow-lg">
            ☀️ Weather & Traffic
          </h1>

          <div className="grid grid-cols-2 gap-8">
            {locations.map((l, idx) => {
              const w = weatherData[l.city]
              return (
                <div
                  key={idx}
                  className="bg-black/40 rounded-2xl p-6 shadow-lg flex flex-col"
                >
                  <h2 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                    {l.city}, {l.state}
                    <img
                      src={`/src/assets/flags/${l.state}.png`}
                      alt={`${l.state} flag`}
                      className="h-6 w-10 rounded shadow-md"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </h2>

                  {w?.current ? (
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={getIconUrl(w.current.icon)}
                        alt={w.current.condition}
                        className="h-16 w-16"
                      />
                      <div>
                        <p className="text-2xl font-bold">
                          {Math.round(w.current.temp)}°F
                        </p>
                        <p className="capitalize opacity-80">
                          {w.current.condition}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-400">Weather unavailable</p>
                  )}

                  <div className="grid grid-cols-5 gap-3">
                    {w?.forecast?.map((f, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center bg-black/30 rounded-lg p-2"
                      >
                        <p className="text-sm opacity-70">
                          {new Date(f.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <img
                          src={getIconUrl(f.icon)}
                          alt={f.condition}
                          className="h-10 w-10"
                        />
                        <p className="text-sm font-semibold">
                          {Math.round(f.temp)}°F
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-[45%] h-full rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Nashville Traffic"
            className="w-full h-full border-0 rounded-2xl"
            src="https://embed.waze.com/iframe?zoom=12&lat=36.1627&lon=-86.7816&pin=1&ct=livemap"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
