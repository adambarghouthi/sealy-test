import styled, { keyframes, css } from 'styled-components';

const popIn = keyframes`
  0% { transform: scale(0) rotate(2deg); opacity: 0; }
  70% { transform: scale(1.1) rotate(2deg); opacity: 1; }
   100% { transform: scale(1) rotate(2deg); opacity: 1; }
`;

const StickyNote = styled.div`
  position: absolute;
  left: ${props => props.x - 12}px;
  top: ${props => props.y - 12}px;
  width: 28px;
  height: 28px;
  background-color: #fff700;
  cursor: pointer;
  animation: ${popIn} 0.3s ease-out;
  z-index: 1002; // To hover over popup
  transform: rotate(2deg);
  box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 20%;
    background-color: rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  ${props => !props.isTemp && css`
    &:hover {
      width: 120px;
      height: 120px;
      transform: rotate(0deg);
      box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
      z-index: 10000; // To hover over other annotations

      &::before {
        height: 10%;
      }
    }
  `}
`;

const ExpandedContent = styled.div`
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
  font-size: 12px;
  color: #000000;
  padding: 15px 10px 10px;
  width: 100%;
  height: 100%;
  overflow: auto;

  ${StickyNote}:hover & {
    opacity: 1;
  }
`;

const AnnotationMarker = ({ isTemp, x, y, comment }) => (
    <StickyNote
        x={x}
        y={y}
        className="annotation-marker"
        isTemp={isTemp}
    >
        {!isTemp && <ExpandedContent>
            {comment}
        </ExpandedContent>}
    </StickyNote>
);

export default AnnotationMarker;
