import express from "express"
import cors from "cors"
import fs from "fs"
import path from "path"

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

const dataDir = path.join(process.cwd(), "src", "data")

app.get("/api/files", (req, res) => {
  try {
    const files = fs
      .readdirSync(dataDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", "")) 
    res.json(files)
  } catch (err) {
    console.error("Error reading files:", err)
    res.status(500).json({ error: "Unable to read files" })
  }
})

app.get("/api/:file", (req, res) => {
  const filePath = path.join(dataDir, `${req.params.file}.json`)
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" })
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  res.json(data)
})

app.post("/api/:file", (req, res) => {
  const filePath = path.join(dataDir, `${req.params.file}.json`)
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2))
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`)
})
