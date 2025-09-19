import { useEffect, useState } from "react"
import { format } from "date-fns"
import { SLIDE_DURATION_MS, DATE_FORMAT } from "../config.js"

import Message from "./Message.jsx"
import Announcements from "./Announcements.jsx"
import Birthdays from "./Birthdays.jsx"
import Events from "./Events.jsx"
import NewHires from "./NewHires.jsx"
import Promotions from "./Promotions.jsx"
import Reminders from "./Reminders.jsx"
import Weather from "./Weather.jsx"

import Logo from "../assets/logo.svg"

const slides = [
  { name: "Message", component: Message },
  { name: "Announcements", component: Announcements },
  { name: "Birthdays", component: Birthdays },
  { name: "Events", component: Events },
  { name: "New Hires", component: NewHires },
  { name: "Promotions", component: Promotions },
  { name: "Reminders", component: Reminders },
  { name: "Weather", component: Weather },
]

export default function Signage() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [dateTime, setDateTime] = useState(new Date())
  const [progressKey, setProgressKey] = useState(0)

  const Current = slides[index].component
  const Previous = prevIndex !== null ? slides[prevIndex].component : null

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setPrevIndex(index)
      setIndex((p) => (p + 1) % slides.length)
      setProgressKey((k) => k + 1)
    }, SLIDE_DURATION_MS)

    const clockTimer = setInterval(() => setDateTime(new Date()), 1000)

    return () => {
      clearInterval(slideTimer)
      clearInterval(clockTimer)
    }
  }, [index])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {Previous !== null && (
        <div className="absolute inset-0 z-10 animate-fadeOut pointer-events-none">
          <Previous />
        </div>
      )}

      <div key={index} className="absolute inset-0 z-20 animate-fadeIn">
        <Current />
      </div>

      <div className="absolute top-0 left-0 w-full h-2 bg-black/30 z-30">
        <div
          key={progressKey}
          className="h-full rounded-r"
          style={{
            backgroundColor: "#0081c8",
            animation: `fillBar ${SLIDE_DURATION_MS}ms linear forwards`,
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-30">
        <div className="m-4 px-4 py-2 rounded-2xl bg-black/40 text-white backdrop-blur flex items-center gap-4 w-fit">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
          <div className="text-lg font-semibold">
            {format(dateTime, DATE_FORMAT)}
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-sm bg-black/30 text-white px-3 py-1 rounded-full z-30">
        {slides[index].name} • {index + 1}/{slides.length}
      </div>

      <style>
        {`
          @keyframes fillBar {
            from { width: 0%; }
            to { width: 100%; }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }

          .animate-fadeIn {
            animation: fadeIn 1.5s ease-in-out forwards;
          }

          .animate-fadeOut {
            animation: fadeOut 1.5s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  )
}
