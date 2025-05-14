import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [frontDoorArea, setFrontDoorArea] = useState('');
  const [torchWidth, setTorchWidth] = useState('');
  const [torchExtrusion, setTorchExtrusion] = useState('');
  const [paintCostPerLiter, setPaintCostPerLiter] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('front_door_area', frontDoorArea);
    formData.append('torch_width', torchWidth);
    formData.append('torch_extrusion', torchExtrusion);
    formData.append('paint_cost_per_liter', paintCostPerLiter);

    try {
      const response = await axios.post('http://localhost:8000/estimate', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Оценка стоимости ЛКМ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="block w-full" />
        <input
          type="number"
          step="any"
          placeholder="Площадь передней двери (м²)"
          value={frontDoorArea}
          onChange={(e) => setFrontDoorArea(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Ширина факела (м)"
          value={torchWidth}
          onChange={(e) => setTorchWidth(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Вылет факела (м)"
          value={torchExtrusion}
          onChange={(e) => setTorchExtrusion(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Стоимость 1 л ЛКМ"
          value={paintCostPerLiter}
          onChange={(e) => setPaintCostPerLiter(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Рассчитать
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Результат:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(result.json_file, null, 2)}
          </pre>
          <h2 className="text-xl font-semibold mb-2 mt-4">Изображение:</h2>
          <img
            src={`data:image/jpeg;base64,${result.labeled_image}`}
            alt="Размеченное изображение"
            className="max-w-full border rounded"
          />
        </div>
      )}
    </div>
  );
}
