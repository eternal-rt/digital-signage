import data from "../data/promotions.json"
import bg from "../assets/backgrounds/promotions.png"

export default function Promotions() {
  const month = new Date().toLocaleDateString("en-US", { month: "long" })

  return (
    <div
      className="relative flex flex-col items-center justify-start h-screen w-screen text-white font-hybrea"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

      
      <h1 className="relative text-6xl font-bold mt-10 text-center drop-shadow-lg z-10">
        ⭐ {month} Promotions!
      </h1>

      <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 max-w-4xl w-full px-8">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/40 rounded-2xl p-6 shadow-lg text-center"
            >
              <h2 className="text-3xl font-semibold mb-2">{item.name}</h2>
              <p className="text-xl opacity-90">
                {item.oldRole}{" "}
                <span className="text-blue-400">→</span> {item.newRole}
              </p>
            </div>
          ))
        ) : (
          <p className="text-xl opacity-70 text-center">
            Pulled from 'Promotions' but theres nothing listed!
          </p>
        )}
      </div>
    </div>
  )
}
