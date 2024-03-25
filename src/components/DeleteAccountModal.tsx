import './deleteModel.css';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteTransactionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleModalContentClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;

  return (
    <>
      <div className="container-modal" onClick={onClose}>
        <div className="delete-modal" onClick={handleModalContentClick}>
          <h1>Delete your Account</h1>
          <p>Are you sure you want to delete your account ?</p>
          <p>all your data will be lost!</p>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};
export default DeleteAccountModal;
