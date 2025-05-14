export default function UploadForm({ onSubmit, state, setState }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="relative inline-block">
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setState({ file: e.target.files[0] })}
            required
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer relative z-0"
          >
            📎 Загрузить изображение
          </label>
    </div>

      <input
        type="number"
        step="any"
        placeholder="Ширина факела (м)"
        value={state.torchWidth}
        onChange={(e) => setState({ torchWidth: e.target.value })}
        className="block w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        required
      />

      <input
        type="number"
        step="any"
        placeholder="Вылет факела (м)"
        value={state.torchExtrusion}
        onChange={(e) => setState({ torchExtrusion: e.target.value })}
        className="block w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        required
      />

      <input
        type="number"
        step="any"
        placeholder="Стоимость 1 л ЛКМ"
        value={state.paintCostPerLiter}
        onChange={(e) => setState({ paintCostPerLiter: e.target.value })}
        className="block w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Рассчитать
      </button>
    </form>
  );
}
