const API_URL = import.meta.env.VITE_API_URL; // En Netlify: /api

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

// --- AUTENTICACIÓN ---

export const loginUser = async (email, password) => {
  // Tu controlador en Java probablemente esté bajo /api/v1/auth/login
  const response = await fetch(`${API_URL}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Credenciales inválidas");
  return response.json();
};

export const registerUser = async (name, email, password) => {
  // 🚨 IMPORTANTE: Tu clase User.java usa firstName y lastName.
  // Vamos a dividir el nombre del formulario para que Java lo acepte.
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "."; // Java no permite nulos

  const response = await fetch(`${API_URL}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      password: password 
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar usuario");
  }
  return response.json();
};

// --- VIDEOS ---

// 🚨 IMPORTANTE: Tu VideoController pide un {projectId}. 
// Usaremos el ID 1 por defecto para probar, o puedes pasar el que necesites.
export const getVideos = async (projectId = 1) => {
  const response = await fetch(`${API_URL}/v1/projects/${projectId}/videos`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Error obteniendo videos");
  
  const result = await response.json();
  // Tu Java usa Page de Spring. Los videos están en result.data.content
  return result.data?.content || []; 
};