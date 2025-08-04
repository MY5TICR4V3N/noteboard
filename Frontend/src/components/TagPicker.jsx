// src/components/TagPicker.jsx
import React from 'react';
import {
  Code2, Paintbrush, NotebookPen, Brain, Briefcase, Music, Flame, BookOpen
} from 'lucide-react';

const availableTags = [
  { label: "Work", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Study", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Ideas", icon: <Brain className="w-4 h-4" /> },
  { label: "Personal", icon: <NotebookPen className="w-4 h-4" /> },
  { label: "Coding", icon: <Code2 className="w-4 h-4" /> },
  { label: "Art", icon: <Paintbrush className="w-4 h-4" /> },
  { label: "Music", icon: <Music className="w-4 h-4" /> },
  { label: "Important", icon: <Flame className="w-4 h-4" /> }
];

const TagPicker = ({ selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-500 mb-1">Select Tags</label>
      <div className="flex flex-wrap gap-2">
        {availableTags.map(({ label, icon }) => (
          <button
            type="button"
            key={label}
            onClick={() => toggleTag(label)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition
              ${selectedTags.includes(label)
                ? 'bg-blue-100 text-blue-600 border-blue-300'
                : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'}`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagPicker;
