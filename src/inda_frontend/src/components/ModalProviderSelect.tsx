import React from 'react';
interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProvider: (providerUrl: string) => void;
}

console.log("ModalProviderSelect.tsx", process.env.REACT_APP_DFX_NETWORK);

const internetIdentityUrl = process.env.REACT_APP_DFX_NETWORK === "local" ? "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai" : "https://identity.ic0.app";

const ModalProviderSelect: React.FC<CustomModalProps> = ({ isOpen, onClose, onSelectProvider }) => {
    if (!isOpen) return null; // Si `isOpen` es false, no renderiza el modal

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-providers" onClick={(e) => e.stopPropagation()}>
                <h2 className='mb-8'>Elige un Proveedor de Identidad</h2>
                <button className="button" onClick={() => onSelectProvider(internetIdentityUrl)}>Internet Identity</button>
                <button className="button"  onClick={() => onSelectProvider("https://nfid.one/authenticate/?applicationName=my-ic-app")}>NFID</button>
            </div>
        </div>
    );
};

export default ModalProviderSelect;
