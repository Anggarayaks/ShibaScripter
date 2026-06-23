import { Icon } from '../utils/icons';

export const Notification = ({ notification }) => {
  if (!notification) return null;

  const bgColor = {
    success: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400',
    error: 'bg-red-500/10 border-red-500/50 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
  }[notification.type] || 'bg-blue-500/10 border-blue-500/50 text-blue-400';

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className={`flex gap-3 items-center px-4 py-3 rounded-lg border ${bgColor}`}>
        <Icon name={notification.type === 'success' ? 'check' : notification.type === 'error' ? 'trash' : 'info'} size={16} />
        {notification.message}
      </div>
    </div>
  );
};

export const Modal = ({ isOpen, title, children, onClose, actions = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={action.className}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DeleteConfirmModal = ({ isOpen, title, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      actions={[
        {
          label: 'Hapus',
          onClick: onConfirm,
          className: 'flex-grow bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg',
        },
        {
          label: 'Batal',
          onClick: onCancel,
          className: 'flex-grow bg-[#0D1117] border border-[#30363D] text-[#8B949E] hover:text-white font-bold py-2 rounded-lg',
        },
      ]}
    >
      <p className="text-[#8B949E]">Apakah Anda yakin ingin melakukan tindakan ini? Tindakan ini tidak dapat dibatalkan.</p>
    </Modal>
  );
};
