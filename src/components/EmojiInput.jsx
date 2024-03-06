import EmojiPicker from "emoji-picker-react";
import { Emoji } from "emoji-picker-react";
import { useState } from "react";

export default function EmojiInput({ setEmoji, value }) {
  const [emojiOpen, setEmojiOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    setEmojiOpen(false);
    setEmoji(emoji.unified);
  };


  return (
    <div className="bg-light border-rounded-lg p-2">
      <div onClick={() => setEmojiOpen(true)} style={{ cursor: "pointer" }}>
        <Emoji unified={value} size="25" />
      </div>
      {emojiOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <EmojiPicker
            searchPlaceholder="00000"
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
            className="position-absolute"
          />
        </div>
      )}
    </div>
  );
}