"use client";

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('https://api.tuimagenrx.app/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        document.cookie = `token=${data.token}; path=/; max-age=3600; secure; samesite=strict`
        router.push('/dashboard')
      } else {
        setError('Credenciales incorrectas. Por favor verifica tu usuario y contraseña.')
        setUsername('')
        setPassword('')
      }
    } catch (error) {
      console.error('Error de red o CORS:', error)
      setError('Ha ocurrido un error. Inténtelo de nuevo más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#1c1c1c] text-white">
      {/* Left side with welcome message */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
          Bienvenido a{' '}
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Tu Imagen RX
          </span>
        </h1>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-[#2a2a2a] p-8 rounded-lg relative transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-purple-900/30 hover:to-purple-600/30 hover:border hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(136,58,234,0.5)]">
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-center text-purple-300">Inicie sesión en su cuenta</h2>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                  Usuario
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full bg-[#3a3a3a] text-white placeholder-gray-500 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full bg-[#3a3a3a] text-white placeholder-gray-500 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                </Button>
              </div>
            </form>
            <div className="text-center text-sm text-gray-400 mt-6">
              Hecho con ❤️ por{' '}
              <Link 
                href="https://agenciaideaspro.cl" 
                className="relative inline-block group text-purple-400 hover:text-purple-300 transition duration-300"
              >
                <span>Agencia Ideas Pro</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
