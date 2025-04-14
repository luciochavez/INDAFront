import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvider: (providerUrl: string) => void;
}

const VITE_NETWORK = import.meta.env.VITE_DFX_NETWORK;
const internetIdentityUrl = VITE_NETWORK === "local"
  ? "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai"
  : "https://identity.ic0.app";

const ModalProviderSelect: React.FC<CustomModalProps> = ({ isOpen, onClose, onSelectProvider }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-providers" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-8 text-lg font-semibold">Elige un Proveedor de Identidad</h2>
        
        <button
          className="button mb-4 w-full"
          onClick={() => onSelectProvider("plug")}
        >
          🔌 Plug Wallet
        </button>

        <button
          className="button mb-4 w-full"
          onClick={() => onSelectProvider(internetIdentityUrl)}
        >
          🧠 Internet Identity
        </button>

        <button
          className="button w-full"
          onClick={() => onSelectProvider("https://nfid.one/authenticate/?applicationName=my-ic-app")}
        >
          🪪 NFID
        </button>
      </div>
    </div>
  );
};

export default ModalProviderSelect;

