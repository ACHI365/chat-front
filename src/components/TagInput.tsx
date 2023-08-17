import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import "./styles.css";
import { useSelectedTagsContext } from "../context/SelectedTagsContext";
import { fetchMessages } from "../services/api";

interface TagType {
  content: string;
}

const TagInput: React.FC = () => {
  const { selectedTags, setSelectedTags, setMessages } = useSelectedTagsContext();
  const [newTag, setNewTag] = useState<string>("");
  const [tagExists, setTagExists] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const addTag = () => {
    if (newTag.trim() !== "") {
      if (selectedTags.includes(newTag)) {
        setTagExists(true);
      } else {
        setTagExists(false);
        setSelectedTags([...selectedTags, newTag]);
        setNewTag("");
      }
    }
  };

  useEffect(() => {    
    fetchMessages(selectedTags)
      .then((fetchedMessages) => setMessages(fetchedMessages))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [selectedTags]);

  const handleTagDelete = (tagContent: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tagContent));
  };

  const handleTagSelect = (tagContent: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tagContent));
    setSearchQuery("");
  };

  const sortedTags = [...selectedTags].sort();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-hidden">
        <div className="custom-scrollbar border rounded p-2 h-full overflow-y-auto ">
          {sortedTags
            .filter((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((tag, index) => (
              <div key={index} className="mb-2 animate-fade-in">
                <Tag
                  content={tag}
                  selected={true}
                  onSelect={() => handleTagSelect(tag)}
                  onDelete={() => handleTagDelete(tag)}
                />
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="mt-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => {
              setNewTag(e.target.value);
              setTagExists(false);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
            placeholder="Type a new tag..."
            className="w-full p-2 border rounded"
          />
          <div className="mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags..."
              className="w-full p-2 border rounded"
            />
          </div>
          {tagExists && (
            <p className="text-red-500 mt-2">Tag already exists.</p>
          )}
          <button
            onClick={addTag}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full transition-colors hover:bg-green-600 transition duration-500 ease-in-out"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagInput;
