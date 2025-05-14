import { useState, useEffect } from 'react';
import UploadForm from '../components/UploadForm';
import ResultView from '../components/ResultView';
import { estimatePaintCost } from '../utils/api';

export default function Home() {
  const [file, setFile] = useState(null);
  const [frontDoorArea, setFrontDoorArea] = useState('');
  const [torchWidth, setTorchWidth] = useState('');
  const [torchExtrusion, setTorchExtrusion] = useState('');
  const [paintCostPerLiter, setPaintCostPerLiter] = useState('');
  const [result, setResult] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (dark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      file,
      front_door_area: frontDoorArea,
      torch_width: torchWidth,
      torch_extrusion: torchExtrusion,
      paint_cost_per_liter: paintCostPerLiter,
    };

    try {
      const res = await estimatePaintCost(data);
      setResult(res);
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };

  const state = { file, frontDoorArea, torchWidth, torchExtrusion, paintCostPerLiter };
  const setState = (update) => {
    if ('file' in update) setFile(update.file);
    if ('frontDoorArea' in update) setFrontDoorArea(update.frontDoorArea);
    if ('torchWidth' in update) setTorchWidth(update.torchWidth);
    if ('torchExtrusion' in update) setTorchExtrusion(update.torchExtrusion);
    if ('paintCostPerLiter' in update) setPaintCostPerLiter(update.paintCostPerLiter);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="p-4 flex justify-end">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 border rounded bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          {dark ? 'Светлая тема' : 'Тёмная тема'}
        </button>
      </div>
      <main className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Оценка стоимости ЛКМ</h1>
        <UploadForm onSubmit={handleSubmit} state={state} setState={setState} />
        <ResultView result={result} />
      </main>
    </div>
  );
}
