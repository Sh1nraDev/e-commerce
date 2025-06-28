import React from 'react';
import './styleModal.css';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{title || 'Confirmar acción'}</h3>
        <p>{message || '¿Estás seguro de continuar?'}</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>Sí, eliminar</button>
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
