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
    <div className="bg-light border-rounded-sm p-2"
                style={{backgroundColor:'var(--grey-light)',border:'none',
                borderRadius:'0.5rem',height:'87%',width:'10%'}}>
      <div style={{margin:'0.4rem 0 0.4rem 0.2rem',cursor: "pointer"}}
      onClick={() => setEmojiOpen(true)}>
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