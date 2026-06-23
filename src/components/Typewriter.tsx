import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  loop?: number | boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}

export default function Typewriter({
  words = ['FULL STACK DEVELOPER'],
  loop = 1,
  typeSpeed = 100,
  deleteSpeed = 50,
  delaySpeed = 700
}: TypewriterProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const handleTyping = () => {
      // Determine if we're typing or deleting
      if (!isDeleting) {
        // Typing
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(typeSpeed);
        
        // If word is complete
        if (text === currentWord) {
          // Pause at end of word
          setTypingSpeed(delaySpeed);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(deleteSpeed);
        
        // If word is deleted
        if (text === '') {
          setIsDeleting(false);
          
          // Move to next word or loop back to first
          const nextWordIndex = (currentWordIndex + 1) % words.length;
          setCurrentWordIndex(nextWordIndex);
          
          // If we've completed all loops and it's not set to infinite loop
          if (loop !== true && nextWordIndex === 0) {
            setLoopNum(prevLoopNum => {
              if (prevLoopNum + 1 >= (loop as number)) {
                return 0;
              }
              return prevLoopNum + 1;
            });
          }
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex, loopNum, words, typeSpeed, deleteSpeed, delaySpeed, loop]);

  return (
    <>
      <style>{`
        .typewriter-text {
          display: inline-block;
          color: #1e5a6b;
          font-weight: 600;
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }
        .blinking-cursor {
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <span className="typewriter-text">
        {text}
        <span className="blinking-cursor">|</span>
      </span>
    </>
  );
}
