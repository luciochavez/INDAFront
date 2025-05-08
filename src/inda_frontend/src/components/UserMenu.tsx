import { useEffect, useRef, useState } from "react";
import { useSession } from "../contexts/sessionContext";
import Button from './Button';

const UserMenu = () => {

    const { user, isAuthenticated, logout } = useSession();
    const menuRef = useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    if (!isAuthenticated) { return null}

    return (
        <div className="relative inline-block">
            {user ?
                <Button
                    className="text-black mr-[10px] h-[40px] w-40 md; bg-blue-500 text-white rounded-md flex justify-center items-center"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {user?.name.slice(0, 12)}
                </Button>
                :
                <Button
                    className="text-black mr-[10px] h-[40px] w-40 bg-blue-500 text-white rounded-md flex justify-center items-center"
                    onClick={logout}
                >Disconnect</Button>
            }
            <div ref={menuRef}>
                <div
                    className={`absolute top-[-10px] right-[0] mt-2 w-[180px] bg-gray-700 text-white rounded shadow-lg transition-all duration-500 origin-top transform ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-500">
                        <button className="block w-full text-left  px-4 py-2 hover:bg-gray-500">Profile {user?.name.slice(0, 5)}</button>
                    </div>
                    <hr className=" border-gray-500" />
                    {user?.kind === "User" &&
                        <div>
                            <div className="block w-full text-left text-[#cafecafe] px-1 text-[14px]">Register section</div>
                            <div onMouseDown={() => console.log("Diseñanr el formulario para registro de creadores de contenido")}>
                                <button className="block w-full text-left px-4 py-1 hover:bg-gray-500">As Creator</button>
                            </div>
                            <div onMouseDown={() => console.log("Diseñanr el formulario para registro de marcas")}>
                                <button className="block w-full text-left px-4 py-1 hover:bg-gray-500">As Brand</button>
                            </div>
                            <div onMouseDown={() => console.log("Diseñanr el formulario para partnership")}>
                                <button className="block w-full text-left px-4 py-1 hover:bg-gray-500">As Partnership</button>
                            </div>
                        </div>}
                    <hr className=" border-gray-500" />

                    <div onMouseDown={logout}>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-500">Log Out</button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default UserMenu;