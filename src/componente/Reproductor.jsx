import { useState, useEffect } from 'react';

const Reproductor = ({ onClose, txt, setCurrentIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [currentIndexLocal, setCurrentIndexLocal] = useState(0); // Estado local para currentIndex
  const sintesis = window.speechSynthesis;

  useEffect(() => {
    if (!txt || txt.trim() === '' || !('speechSynthesis' in window)) {
      console.error("Texto vacío o síntesis de voz no soportada.");
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(txt);
    newUtterance.lang = 'es-MX';
    newUtterance.volume = 1;
    newUtterance.rate = 1;
    newUtterance.pitch = 1;

    newUtterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      const palabras = txt.substring(0, charIndex).split(' ');
      const currentWordIndex = palabras.length - 1;
      setCurrentIndex(currentWordIndex); // Actualiza el índice en el componente padre
      setCurrentIndexLocal(currentWordIndex); // Actualiza el índice local
    };

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsNew(true);
    };

    setUtterance(newUtterance);
    setIsNew(true);

    return () => {
      sintesis.cancel();
    };
  }, [txt, setCurrentIndex]);

  const togglePlay = () => {
    if (!utterance) {
      console.log("Utterance no está definido aún.");
      return;
    }

    if (isNew) {
      sintesis.cancel();
      sintesis.speak(utterance);
      setIsPlaying(true);
      setIsNew(false);
    } else {
      if (isPlaying) {
        sintesis.pause();
        setIsPlaying(false);
      } else {
        sintesis.resume();
        setIsPlaying(true);
      }
    }
  };

  const skipForward = () => {
    if (!utterance) {
      console.log("Utterance no está definido aún.");
      return;
    }

    const words = txt.split(' ');
    const wordsPerSecond = 3; // Ajusta esto según la velocidad de lectura
    const skipWordsCount = wordsPerSecond * 10;
    const newIndex = Math.min(currentIndexLocal + skipWordsCount, words.length - 1);

    setCurrentIndex(newIndex);
    setCurrentIndexLocal(newIndex);

    const newUtterance = new SpeechSynthesisUtterance(words.slice(newIndex).join(' '));
    newUtterance.lang = 'es-MX';
    newUtterance.volume = 1;
    newUtterance.rate = 1;
    newUtterance.pitch = 1;

    newUtterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      const palabras = txt.substring(0, newIndex).split(' ').concat(txt.substring(newIndex).split(' ').slice(0, Math.floor(charIndex / 5)));
      setCurrentIndex(newIndex + palabras.length - 1);
      setCurrentIndexLocal(newIndex + palabras.length - 1);
    };

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsNew(true);
    };

    sintesis.cancel();
    sintesis.speak(newUtterance);
    setUtterance(newUtterance);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    const words = txt.split(' ');
    const wordsPerSecond = 3; // Ajusta esto según la velocidad de lectura
    const skipWordsCount = wordsPerSecond * 10;
    const newIndex = Math.max(currentIndexLocal - skipWordsCount, 0); // Asegúrate de no ir por debajo de 0

    setCurrentIndex(newIndex);
    setCurrentIndexLocal(newIndex);

    const newUtterance = new SpeechSynthesisUtterance(words.slice(newIndex).join(' '));
    newUtterance.lang = 'es-MX';
    newUtterance.volume = 1;
    newUtterance.rate = 1;
    newUtterance.pitch = 1;

    newUtterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      const palabras = txt.substring(0, newIndex).split(' ').concat(txt.substring(newIndex).split(' ').slice(0, Math.floor(charIndex / 5)));
      setCurrentIndex(newIndex + palabras.length - 1);
      setCurrentIndexLocal(newIndex + palabras.length - 1);
    };

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsNew(true);
    };

    sintesis.cancel();
    sintesis.speak(newUtterance);
    setUtterance(newUtterance);
    setIsPlaying(true);
  };

  const toggleOnClose = () => {
    sintesis.cancel();
    onClose();
  };

  if (!txt || txt.trim() === '') {
    return null;
  }

  return (
    <div className="player-container">
      <div className="player-header">
        <i className="bi bi-x-square" onClick={toggleOnClose}></i>
      </div>
      <div className="player-controls">
        <i className="bi bi-rewind" onClick={skipBackward}></i> {/* Llama a la función de retroceder */}
        {isPlaying ? (
          <i className="bi bi-pause" onClick={togglePlay}></i>
        ) : (
          <i className="bi bi-play-circle" onClick={togglePlay}></i>
        )}
        <i className="bi bi-fast-forward" onClick={skipForward}></i>
      </div>
    </div>
  );
};

export default Reproductor;
