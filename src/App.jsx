import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure you are importing a CSS file

const Stopwatch = ({ isActive, setIsActive, keyCount, maxCount }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && keyCount < maxCount) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    if (keyCount === maxCount) {
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, keyCount, maxCount]);

  const formatTime = (time) => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);   
    return `${minutes}:${seconds}`;
  };

  return <div className="stopwatch">{formatTime(time)}</div>;
};

const KeyCounter = () => {
  const [keyCount, setKeyCount] = useState(0);
  const maxCount = 108;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = () => {
      if (keyCount < maxCount) {
        if (keyCount === 0) {
          setIsActive(true); // Start stopwatch on the first click
        }
        setKeyCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount === maxCount) {
            const audio = new Audio('/sound.mp3');
            audio.play();
          }
          return newCount;
        });
      }
    };

    document.addEventListener('click', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleKeyDown);
    };
  }, [keyCount]);

  return (
    <div className="counter">
      <div>{keyCount}</div>
      <Stopwatch isActive={isActive} setIsActive={setIsActive} keyCount={keyCount} maxCount={maxCount} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <KeyCounter />
    </div>
  );
}

export default App;
