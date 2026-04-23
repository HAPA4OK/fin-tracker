

const API_URL = 'http://localhost:5000';

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Передаем ошибку из бэкенда дальше
      throw new Error(data.message || 'Ошибка при регистрации');
    }

    return data; // Возвращаем успешный ответ
  } catch (error) {
    throw error;
  }
};



export const loginUser = async (credentials: any) => {
  try {
    const response = await fetch(`${API_URL}/login`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка при входе');
    }
    return data;
  } catch (error) {
    throw error;
  }
};