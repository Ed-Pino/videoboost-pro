const API_URL = import.meta.env.VITE_API_URL;

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/videos/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error subiendo video");
  }

  return response.json();
};

export const getVideos = async () => {
  const response = await fetch(`${API_URL}/videos`);

  if (!response.ok) {
    throw new Error("Error obteniendo videos");
  }

  return response.json();
};
