import { useState, useEffect } from "react"
import Logo from "../assets/logo.svg"

const defaultFieldMap = {
  announcements: ["title", "details"],
  birthdays: ["name", "date"],
  events: ["title", "date", "location", "description"],
  newHires: ["name", "role", "hireDate", "area"],
  promotions: ["name", "oldRole", "newRole"],
  reminders: ["title", "details"],
  weatherLocations: ["city", "state"],
  traffic: ["city", "lat", "lng", "zoom"],
  message: ["title", "content"],
}

const displayNameMap = {
  announcements: "Looking Ahead",
  message: "Message",
}

export default function Admin() {
  const [files, setFiles] = useState([])
  const [active, setActive] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [fields, setFields] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)

  // Fetch file list
  useEffect(() => {
    fetch("http://localhost:4000/api/files")
      .then((res) => res.json())
      .then((list) => {
        if (Array.isArray(list)) {
          setFiles(list)
          if (list.length > 0) setActive(list[0])
        }
      })
      .catch((err) => console.error("Error fetching file list:", err))
  }, [])

  // Fetch section data
  useEffect(() => {
    if (!active) return
    setLoading(true)
    fetch(`http://localhost:4000/api/${active}`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setData(json)
          setFields(json.length > 0 ? Object.keys(json[0]) : defaultFieldMap[active] || [])
        } else {
          setData([json])
          setFields(Object.keys(json))
        }
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false))
  }, [active])

  const saveAll = () => {
    const payload = active === "message" && data.length === 1 ? data[0] : data

    fetch(`http://localhost:4000/api/${active}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload, null, 2),
    })
      .then(() => {
        setStatus("✅ Saved successfully!")
        setTimeout(() => setStatus(""), 2000)
      })
      .catch(() => {
        setStatus("❌ Error saving data")
        setTimeout(() => setStatus(""), 3000)
      })
  }

  const addEntry = () => {
    const entry = {}
    fields.forEach((f) => (entry[f] = ""))
    setData([...data, entry])
    setExpandedIndex(data.length) // expand the new one
  }

  const updateField = (idx, field, value) => {
    const updated = [...data]
    updated[idx][field] = value
    setData(updated)
  }

  const deleteEntry = (idx) => {
    setData(data.filter((_, i) => i !== idx))
    if (expandedIndex === idx) setExpandedIndex(null)
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col items-center">
        <img src={Logo} alt="Logo" className="h-16 mb-4" />
        <h1 className="text-2xl font-bold mb-6 text-center">Signage Panel</h1>
        <ul className="space-y-2 w-full">
          {files.map((f) => (
            <li key={f}>
              <button
                className={`w-full text-left px-4 py-2 rounded capitalize ${
                  active === f ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActive(f)
                  setExpandedIndex(null)
                }}
              >
                {displayNameMap[f] || f.replace(/([A-Z])/g, " $1").trim()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {active ? (
          <>
            <h2 className="text-3xl font-bold mb-6">
              {displayNameMap[active] || active.replace(/([A-Z])/g, " $1").trim()}
            </h2>

            {status && <p className="mb-4 text-green-400 font-semibold">{status}</p>}

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4 mb-6">
                {data.map((item, idx) => {
                  const isExpanded = expandedIndex === idx
                  const summaryField = fields[0] || "Entry"

                  return (
                    <div key={idx} className="bg-gray-800 rounded-lg shadow">
                      <div className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-700"
                           onClick={() => setExpandedIndex(isExpanded ? null : idx)}>
                        <span className="font-semibold">
                          {item[summaryField] || `Entry ${idx + 1}`}
                        </span>
                        <span>{isExpanded ? "▲" : "▼"}</span>
                      </div>

                      {isExpanded && (
                        <div className="p-4 space-y-3">
                          {fields.map((field) => (
                            <div key={field} className="flex flex-col">
                              <label className="text-sm text-gray-400 mb-1 capitalize">
                                {field}
                              </label>
                              <input
                                type={
                                  active === "birthdays" && field === "date"
                                    ? "text"
                                    : active === "events" && field === "date"
                                    ? "datetime-local"
                                    : field.toLowerCase().includes("date")
                                    ? "date"
                                    : "text"
                                }
                                value={item[field] || ""}
                                onChange={(e) => updateField(idx, field, e.target.value)}
                                className="px-3 py-2 rounded bg-gray-700"
                              />
                            </div>
                          ))}
                          {active !== "message" && (
                            <button
                              onClick={() => deleteEntry(idx)}
                              className="text-red-400 hover:text-red-600 mt-2"
                            >
                              ✕ Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex space-x-4">
              {active !== "message" && (
                <button
                  onClick={addEntry}
                  className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
                >
                  + Add New {displayNameMap[active] || active.replace(/([A-Z])/g, " $1").trim()}
                </button>
              )}
              <button
                onClick={saveAll}
                className="bg-green-600 px-6 py-3 rounded hover:bg-green-700"
              >
                💾 Save Changes
              </button>
            </div>
          </>
        ) : (
          <p>Select a section from the sidebar.</p>
        )}
      </div>
    </div>
  )
}
