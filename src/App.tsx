import { MagnifyingGlass } from "@phosphor-icons/react"
import { useState } from "react"
import axios from "axios"

export default function App() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<{
    name: string
    bio: string
    avatar_url: string
  } | null>(null)

  // Função para buscar dados do usuário na API do GitHub
  const handleSearch = async () => {
    if (!username) return
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      )
      setUserData(response.data)
    } catch {
      setUserData(null)
      setError(
        "Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[#005cff]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-[#005cff]/40 to-transparent" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from({ length: 30 }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-2 h-2 m-2 rounded-full bg-[#ffffff]"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-black px-80 py-60 rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-8">
            <h1 className="text-[#ffffff] text-4xl font-bold">Perfil GitHub</h1>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Digite um usuário do Github"
                className="flex-1 w-[300px] px-4 py-3 rounded-l-lg bg-white text-[#000000] focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="bg-[#005cff] p-3 rounded-r-lg"
                onClick={handleSearch}
              >
                <MagnifyingGlass className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && (userData || error) && (
            <div className="max-w-3xl mx-auto bg-[#dddddd] rounded-lg p-6 flex flex-col gap-6 items-center">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {userData && (
                <div className="flex flex-row gap-6 items-start justify-center">
                  <img
                    src={userData.avatar_url}
                    alt={`${userData.name}'s avatar`}
                    className="w-[220px] h-[180px] rounded-full border-4 border-[#005cff] overflow-hidden"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-[#005cff] text-xl font-bold mb-4">
                      {userData.name}
                    </h2>
                    <p className="text-[#1f1f1f] text-base">{userData.bio}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
