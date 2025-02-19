const API_URL = "http://localhost:3000";

export async function getUsers() {
  const response = await fetch(`${API_URL}/usuarios`);
  return await response.json();
}

export async function addUser(nombre: string) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });

  return await response.json();
}
