import { MessageCircleMore } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { WhatsappIcon } from "../icons";

export interface NodeData {
  text: string;
}

interface TextNodeProps extends NodeProps {
  onUpdateText?: (nodeId: string, text: string) => void;
}

const TextNode = memo(({ data, id, onUpdateText }: TextNodeProps) => {
  const nodeData = data as NodeData;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(nodeData.text || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTextClick = () => {
    setIsEditing(true);
    setEditText(nodeData.text || "");

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 0);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (editText !== nodeData.text && onUpdateText) {
      onUpdateText(id, editText);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (editText !== nodeData.text && onUpdateText) {
        onUpdateText(id, editText);
      }
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(nodeData.text || "");
    }
  };

  return (
    <div className="w-72 border-none shadow-gray-600 shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between w-full px-3 py-2 bg-cyan-100">
        <div className="flex items-center gap-2">
          <MessageCircleMore size={12} />
          <span className="text-sm font-medium text-gray-700">
            Send Message
          </span>
        </div>
        <div className="p-1 bg-white rounded-full">
          <WhatsappIcon size={10} color="#32a84a" />
        </div>
      </div>

      <div className="px-3 py-3 bg-white rounded-b-lg">
        {isEditing ? (
          <input
            ref={inputRef}
            value={""}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="text-sm text-gray-800 break-words cursor-pointer hover:bg-gray-50 px-1 py-1 rounded transition-colors"
            placeholder="Enter message text..."
          />
        ) : (
          <p
            className="text-sm text-gray-800 break-words cursor-pointer hover:bg-gray-50 px-1 py-1 rounded transition-colors"
            onClick={handleTextClick}
          >
            {nodeData.text || "Enter message text..."}
          </p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-500 border-2 border-white"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
});

TextNode.displayName = "TextNode";

export default TextNode;
