import { Info } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const FloatingElements = ({ selectedText, position, showExplanation, onExplanationClick, onClose }) => {
  if (!selectedText || !position) return null;

  return createPortal(
    <div className="relative">
      {!showExplanation ? (
        <button
          className="fixed bg-white shadow-lg rounded-full p-2 flex items-center gap-2 text-sm border border-gray-200 hover:bg-gray-50 transition-colors z-50"
          style={{
            top: `${position.y-5}px`,
            left: `${position.x}px`,
            transform: 'translate(-50%, -100%)'
          }}
          onClick={onExplanationClick}
        >
          <Info className="w-4 h-4 text-blue-500" />
          <span>Explain</span>
        </button>
      ) : (
        <div 
          className="fixed bg-white shadow-xl rounded-xl p-4 border border-gray-200 w-64 z-50"
          style={{
            top: `${position.y + 30}px`,
            left: `${position.x}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{selectedText}</h4>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Explanation for: "{selectedText}"
          </p>
        </div>
      )}
    </div>,
    document.body
  );
};

const SelectableText = ({ text }) => {
  const [selectedText, setSelectedText] = useState(null);
  const [position, setPosition] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't handle if clicking on the selection container
      if (containerRef.current?.contains(e.target)) {
        return;
      }

      // Don't handle if clicking on the floating elements
      if (e.target.closest('.fixed')) {
        return;
      }

      // Clear selection and hide elements
      setSelectedText(null);
      setPosition(null);
      setShowExplanation(false);
      window.getSelection()?.removeAllRanges();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSelectedText(text);
      setPosition({
        x: rect.left + (rect.width / 2),
        y: rect.top + window.scrollY
      });
      setShowExplanation(false);
    } else {
      setSelectedText(null);
      setPosition(null);
      setShowExplanation(false);
    }
  };

  const handleExplanationClick = (e) => {
    e.stopPropagation();
    setShowExplanation(true);
  };

  const handleClose = () => {
    setSelectedText(null);
    setPosition(null);
    setShowExplanation(false);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <div ref={containerRef}>
        <p 
          className="text-gray-600" 
          onMouseUp={handleSelection}
        >
          {text}
        </p>
      </div>
      
      <FloatingElements
        selectedText={selectedText}
        position={position}
        showExplanation={showExplanation}
        onExplanationClick={handleExplanationClick}
        onClose={handleClose}
      />
    </>
  );
};

const ContentBox = ({ title, content, className }) => (
  <div className={`bg-white/90 backdrop-blur-xl shadow-xl rounded-xl ${className}`}>
    <div className="border-b border-gray-100 p-4">
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    </div>
    <div className="p-4 overflow-y-auto">
      {content.length > 0 ? (
        <div className="space-y-2">
          {content.map((item, index) => (
            <SelectableText key={index} text={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{title} will appear here after processing</p>
      )}
    </div>
  </div>
);

export default ContentBox;