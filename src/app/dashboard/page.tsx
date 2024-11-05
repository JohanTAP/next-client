"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Importamos el contexto de autenticación

export default function Dashboard() {
  const { token, setToken } = useAuth(); // Extraemos el token y setToken del contexto
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirigimos al usuario a la página de inicio de sesión
      router.push("/");
    }
  }, [token, router]);

  const handleLogout = () => {
    setToken(null); // Limpiamos el token en el contexto de autenticación
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // Limpiamos la cookie por seguridad
    router.push("/"); // Redirigimos al usuario a la página de inicio de sesión
  };

  if (!token) {
    // Si el token no está presente, mostramos una pantalla de carga o un mensaje de redirección
    return (
      <div className="flex h-screen items-center justify-center bg-[#1c1c1c]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-[#1c1c1c] text-white overflow-hidden">
        {/* Sidebar */}
        <Sidebar collapsible="icon" className="w-64 h-full bg-[#2a2a2a] border-r border-gray-700">
          <SidebarHeader>
            <div className="p-4">
              <h1 className="text-2xl font-bold text-purple-400">Tu Imagen RX</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-purple-700 rounded">
                    <Home size={20} />
                    <span>Inicio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/profile" className="flex items-center space-x-2 p-2 hover:bg-purple-700 rounded">
                    <User size={20} />
                    <span>Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-purple-700 rounded">
                    <Settings size={20} />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <Button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-2 px-4 rounded-md transition duration-300"
              >
                <LogOut size={20} className="mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">Bienvenido al Dashboard</h2>
          <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Tu Token de Acceso:</h3>
            <div className="bg-[#3a3a3a] p-4 rounded overflow-x-auto">
              <code className="text-sm text-purple-300 break-all">{token}</code>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Este token es utilizado para autenticar tus solicitudes a la API. Mantenlo seguro y no lo compartas.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
