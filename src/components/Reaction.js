"use client";

import React, { useState, useEffect, useRef } from 'react';

import AnnotationMarker from './AnnotationMarker';
import CommentPopup from './CommentPopup';

const Reaction = () => {
  const [reactions, setReactions] = useState([]);
  const [tempMarker, setTempMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest('.emoji-reaction') || e.target.closest('.reaction-popup')) return;
      
      if (showPopup && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
        setTempMarker(null);
      } else if (!showPopup) {
        setTempMarker({ x: e.clientX, y: e.clientY });
        setShowPopup(true);
        setPopupPosition({ x: e.clientX, y: e.clientY });
      }      
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showPopup]);

  const addReaction = (comment) => {
    if (tempMarker) {
      setReactions([...reactions, { ...tempMarker, comment }]);
      setTempMarker(null);
      setShowPopup(false);
    }
  };

  return (
    <>
      {reactions.map((reaction, index) => (
        <AnnotationMarker
          key={index}
          x={reaction.x}
          y={reaction.y}
          className="emoji-reaction"
          comment={reaction.comment}
        />
      ))}
      {showPopup && (
        <CommentPopup 
          ref={popupRef}
          x={popupPosition.x} 
          y={popupPosition.y}
          onAddComment={addReaction}
          className="comment-popup"
        />
      )}
      {tempMarker && (
        <AnnotationMarker
          x={tempMarker.x}
          y={tempMarker.y}
          className="emoji-reaction temp-marker"
          isTemp={true}
        />
      )}
    </>
  );
};

export default Reaction;