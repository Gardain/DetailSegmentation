import axios from 'axios';

export async function estimatePaintCost(data) {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);

  const response = await axios.post('http://localhost:8000/estimate', formData);
  return response.data;
}
