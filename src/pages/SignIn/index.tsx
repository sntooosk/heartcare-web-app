import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../context/AuthContext';
import colors from '../../utils/styles';
import Notification from '../../components/Notification';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading, errorMessage } = useAuth();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string>(''); // State para mensagem de notificação
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('error'); // State para tipo de notificação

    const handleLogin = async () => {
        await signIn({ email, password });
        if (errorMessage) {
            setNotificationMessage(errorMessage.toString());
        }
        setNotificationType('error');
        setShowNotification(true);
    };
    

    const closeNotification = () => {
        setShowNotification(false);
    };

    return (
        <div className='flex flex-row items-center justify-center sm:max-2xl:justify-between' style={{ backgroundColor: colors.BACKGROUND }}>
            <div className='flex flex-col w-full sm:w-2/3 md:max-2xl:w-4/12 justify-center items-center' style={{ backgroundColor: colors.WHITE, height: '100vh' }}>
                <h1 className='text-4xl font-bold py-5' style={{ color: colors.TITLE }}>Login</h1>
                <div className='w-60 h-0.5' style={{ backgroundColor: colors.TEXT }}></div>

                <div className='w-full p-8'>
                    <h3 className='text-2xl font-bold' style={{ color: colors.CONTENT }}>Email</h3>
                    <Input
                        setValue={(txt) => setEmail(txt)}
                        value={email}
                        leftIcon={<h3> <AiOutlineMail className='mr-4' style={{ color: colors.ICON }} /> </h3>}
                        type='email'
                        placeholder='Informe seu email'
                    />
                </div>

                <div className='w-full p-8'>
                    <h3 className='text-2xl font-bold' style={{ color: colors.CONTENT }}>Senha</h3>
                    <Input
                        setValue={(txt) => setPassword(txt)}
                        value={password}
                        type='password'
                        leftIcon={<h3> <AiFillLock className='mr-4' style={{ color: colors.ICON }} /> </h3>}
                        placeholder='Informe sua senha'
                    />
                </div>

                <div className='w-full px-10 mt-10'>
                    <Button onClick={handleLogin}>
                        {isLoading ? <Spinner /> : 'Entrar'}
                    </Button>
                </div>

                {showNotification && (
                    <Notification
                        message={notificationMessage}
                        type={notificationType}
                        onClose={closeNotification}
                    />
                )}
            </div>

            <div className='flex items-center justify-center w-0 h-screen sm:w-full' style={{ backgroundColor: colors.PRIMARY }}>
            </div>
        </div>
    );
}

export default SignIn;
