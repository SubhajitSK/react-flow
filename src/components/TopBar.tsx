interface TopBarProps {
  onSave: () => void;
  isSaving?: boolean;
}

export default function TopBar({ onSave, isSaving = false }: TopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Chatbot Flow Builder
        </h1>
      </div>
      <button
        onClick={onSave}
        disabled={isSaving}
        className={`px-4 py-2 border-2 rounded-lg font-semibold cursor-pointer transition-colors ${
          isSaving
            ? "border-gray-300 text-gray-500 cursor-not-allowed"
            : "border-blue-500 text-blue-500 hover:bg-blue-50"
        }`}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
