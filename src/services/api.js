const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Credenciales incorrectas");
  }
  return response.json(); 
};

export const registerUser = async (name, email, password) => {
  // 1. La URL debe empezar con /api (a través de la variable)
  // 2. Quitamos el dominio de Render del código
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      name: name, 
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

export const getVideos = async () => {
  const response = await fetch(`${API_URL}/videos`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) throw new Error("Sesión expirada");
  if (!response.ok) throw new Error("Error obteniendo videos");
  return response.json();
};