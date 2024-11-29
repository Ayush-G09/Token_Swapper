import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { theme } from '../utils/theme';

// Define types for props
type ModalProps = {
  /**
   * A flag indicating whether the modal is open or closed.
   */
  isOpen: boolean;

  /**
   * Function to close the modal.
   */
  closeModal: () => void;

  /**
   * The content to be displayed inside the modal.
   * This can be any valid React element.
   */
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  // Always call useSelector here to ensure it's called on every render
  const mode = useSelector((state: RootState) => state.mode.mode);

  // Current theme
  const th = theme(mode);

  // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  /**
   * Closes the modal when the user clicks outside the modal content (on the overlay).
   * 
   * @param e - The mouse event from clicking on the overlay.
   */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={handleOverlayClick}
    >
      <div className="modal-content relative w-[90%] md:w-1/2 p-6 rounded-lg flex flex-col items-center" style={{backgroundColor: th.primary}}>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
