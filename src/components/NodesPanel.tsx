import { MessageCircleMore, MessageSquare } from "lucide-react";

const NodesPanel = () => {
  // Handle drag start for the message node
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full flex flex-col w-96 border-l-2 border-gray-200 p-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Nodes Panel</h2>
        <p className="text-sm text-gray-600 mt-1">
          Drag nodes to the canvas or double-click to add
        </p>
      </div>

      <div className="space-y-4 py-4 grid grid-cols-2 gap-4">
        <div
          className="cursor-move hover:shadow-md transition-all border-2 col-span-1 border-blue-500 text-blue-500 rounded-md font-semibold"
          draggable
          onDragStart={(event) => onDragStart(event, "textNode")}
        >
          <div className="p-4">
            <div className="flex flex-col items-center gap-3">
              <MessageCircleMore size={20} className="text-blue-500" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Message</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;
