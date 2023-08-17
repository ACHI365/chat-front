import React from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

interface TagProps {
  content: string;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ content, selected, onSelect, onDelete }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded ${"bg-gray-300"} border ${"border-green-500"} transition-colors`}
    >
      <span className={`text-lg mr-2 ${"text-black"}`}>{content}</span>
      <div className="flex space-x-2">
        <button className="text-red-500" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Tag;
