import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './styles.css'; 

const LoginButton: React.FC = () => {
    const { login } = useContext(AuthContext);

    return (
        <button translate="no" className="button" onClick={login}>Log in</button>
    );
};

export default LoginButton;

// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import './Button.css';

// const LoginButton: React.FC = () => {
//     const { login } = useContext(AuthContext);
//     const [isModalOpen, setModalOpen] = useState(false);

//     const openModal = () => setModalOpen(true);
//     const closeModal = () => setModalOpen(false);

//     // URLs de los proveedores de identidad
//     const internetIdentityUrl = "https://identity.ic0.app";
//     const nfidUrl = "https://nfid.one/authenticate";

//     // Función para manejar el inicio de sesión con el proveedor seleccionado
//     const handleProviderLogin = async (providerUrl: string) => {
//         await login(providerUrl); // Llama a la función `login` con el URL del proveedor
//         closeModal(); // Cierra el modal después de iniciar sesión
//     };

//     return (
//         <>
//             <button className="button" onClick={openModal}>Log in</button>
            
//             {isModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Elige un proveedor de identidad</h2>
//                         <button 
//                             className="button" 
//                             onClick={() => handleProviderLogin(internetIdentityUrl)}
//                         >
//                             Internet Identity
//                         </button>
//                         <button 
//                             className="button" 
//                             onClick={() => handleProviderLogin(nfidUrl)}
//                         >
//                             NFID
//                         </button>
//                         <button className="button close-button" onClick={closeModal}>Cancelar</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default LoginButton;
