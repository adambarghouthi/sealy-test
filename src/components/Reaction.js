"use client";

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaRegSmile, FaPlus } from 'react-icons/fa'; // Import the plus icon

import AnnotationMarker from './AnnotationMarker';
import CommentPopup from './CommentPopup';

const PopupContainer = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1001; // Ensure this is below the AnnotationMarker
  width: 300px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  font-family: sans-serif;
  font-size: 14px;
  color: #000000; // Set font color to black
`;

const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmojiPickerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007bff; // Blue color
`;

const AddReactionButton = styled(EmojiPickerButton)`
  background-color: #007bff; // Same blue color as EmojiPickerButton
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 14px; // Smaller icon size
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

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