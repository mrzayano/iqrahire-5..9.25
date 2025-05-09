import { useState } from 'react';
import { cn } from '@/lib/utils';

// Common emoji categories for our simple picker
const emojis = {
  smileys: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎'],
  gestures: ['👍', '👎', '👌', '✌️', '🤞', '👏', '🙌', '🤝', '👊', '❤️', '🔥', '✨'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐮', '🐷'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑'],
};

type EmojiCategory = keyof typeof emojis;

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>('smileys');
  
  return (
    <div className="w-full p-2">
      <div className="flex space-x-2 mb-2 border-b pb-2">
        <button
          onClick={() => setActiveCategory('smileys')}
          className={cn(
            "p-1 rounded hover:bg-muted transition-colors",
            activeCategory === 'smileys' && "bg-muted"
          )}
        >
          😊
        </button>
        <button
          onClick={() => setActiveCategory('gestures')}
          className={cn(
            "p-1 rounded hover:bg-muted transition-colors",
            activeCategory === 'gestures' && "bg-muted"
          )}
        >
          👍
        </button>
        <button
          onClick={() => setActiveCategory('animals')}
          className={cn(
            "p-1 rounded hover:bg-muted transition-colors",
            activeCategory === 'animals' && "bg-muted"
          )}
        >
          🐱
        </button>
        <button
          onClick={() => setActiveCategory('food')}
          className={cn(
            "p-1 rounded hover:bg-muted transition-colors",
            activeCategory === 'food' && "bg-muted"
          )}
        >
          🍎
        </button>
      </div>
      
      <div className="grid grid-cols-6 gap-2">
        {emojis[activeCategory].map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => onEmojiSelect(emoji)}
            className="text-xl h-8 w-8 flex items-center justify-center hover:bg-muted rounded cursor-pointer transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
