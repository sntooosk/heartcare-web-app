import { Link, Outlet } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FaHospitalUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from "../../context/AuthContext";
import colors from "../../utils/styles";

const routes = [
    {
        label: 'Publicação',
        path: 'publicacao',
        icon: <FaHospitalUser style={{ color: colors.ICON }} />
    },
];

function Root() {
    const { signOut } = useAuth();
    const { width } = useWindowDimensions();
    return (
        <div className="flex flex-row" style={{ backgroundColor: colors.BACKGROUND }}>
            {
                width > 639 ?
                    <div className="flex fixed flex-col" style={{ backgroundColor: colors.PRIMARY, width: '15rem', height: '100%', padding: '1rem' }}>
                        <div className="flex flex-col h-full p-5">
                            {
                                routes.map(r => (
                                    <button key={r.path} className="flex justify-center items-center w-full p-3 rounded-md my-3" style={{ backgroundColor: colors.BUTTON }}>
                                        <Link className="font-bold" style={{ color: colors.BUTTON_TEXT }} to={r.path}>{r.label}</Link>
                                    </button>
                                ))
                            }
                            <button
                                className="justify-self-start w-full p-3 rounded-md my-3"
                                style={{ backgroundColor: colors.BUTTON }}
                                onClick={signOut}>
                                <span style={{ color: colors.BUTTON_TEXT }}>Sair da conta</span>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="flex fixed bottom-0 left-0 w-full justify-evenly" style={{ backgroundColor: colors.BUTTON }}>
                        {
                            routes.map(r => (
                                <button key={r.path} className="flex justify-center items-center w-16 sm:w-40 p-3 rounded-md my-3" style={{ backgroundColor: colors.BUTTON }}>
                                    <Link className="font-bold" style={{ color: colors.BUTTON_TEXT }} to={r.path}>{r.icon}</Link>
                                </button>
                            ))
                        }
                        <button className="flex justify-center items-center w-16 sm:w-40 p-3 rounded-md my-3 font-bold" style={{ backgroundColor: colors.BUTTON }} onClick={signOut}>
                            <BiLogOut style={{ color: colors.BUTTON_TEXT }} />
                        </button>
                    </div>
            }
            <div className="pb-20 sm:ml-52" style={{ backgroundColor: colors.BACKGROUND_CARD }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
