export default function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Результат:</h2>
      <pre className="bg-gray-100 p-4 rounded mb-4 whitespace-pre-wrap dark:bg-gray-800 dark:text-white">
        {JSON.stringify(result.json_file, null, 2)}
      </pre>
      <h2 className="text-xl font-semibold mb-2">Изображение:</h2>
      <img
        src={`data:image/jpeg;base64,${result.labeled_image}`}
        alt="Размеченное изображение"
        className="max-w-full border dark:border-gray-600 rounded"
      />
    </div>
  );
}
