import { useState,forwardRef } from 'react';
import styled from 'styled-components';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaRegSmile, FaPlus } from 'react-icons/fa';

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
  background-color: #007bff; // Blue color
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3; // Darker blue color on hover
  }
`;

const CommentPopup = forwardRef(({ x, y, onAddComment }, ref) => {
    const [comment, setComment] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiSelect = (emoji) => {
        setComment(prevComment => prevComment + emoji.native);
        setShowEmojiPicker(false);
    };

    return (
        <PopupContainer 
          ref={ref}
          x={x} 
          y={y}
          className="reaction-popup"
        >
          <CommentInput 
            placeholder="Add a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <PopupFooter>
            <EmojiPickerButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <FaRegSmile />
            </EmojiPickerButton>
            <AddReactionButton onClick={() => onAddComment(comment)}>
              <FaPlus />
            </AddReactionButton>
          </PopupFooter>
          {showEmojiPicker && (
            <Picker 
              data={data} 
              onEmojiSelect={handleEmojiSelect}
              theme="light"
            />
          )}
        </PopupContainer>
    );
});

export default CommentPopup;
