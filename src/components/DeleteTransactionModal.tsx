import './deleteModel.css';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
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
          <h1>Delete Transaction</h1>
          <p>Are you sure you want to delete this transaction ?</p>
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};
export default DeleteTransactionModal;
