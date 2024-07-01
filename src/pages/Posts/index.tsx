import { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import CreatePostDTO from '../../models/dto/CreatePostDTO';
import { useAuth } from '../../context/AuthContext';
import colors from '../../utils/styles';
import { create } from '../../api/request/post/create';
import Notification from '../../components/Notification';
import { get } from '../../api/request/post/get';
import Post from '../../models/Post';
import { deletar } from '../../api/request/post/delete';
import { update } from '../../api/request/post/update';
import UpdatePostDTO from '../../models/dto/updatePostDTO';

function PostTela() {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
    const [posts, setPosts] = useState<Post[]>([]);
    const { authData } = useAuth();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await get(authData?.token || '');
            setPosts(response);
        } catch (error) {
            handleFetchError();
        }
    };

    const handleFetchError = () => {
        setNotificationMessage('Erro ao buscar publicações. Por favor, tente novamente.');
        setNotificationType('error');
        setShowNotification(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            if (!title || !comment) {
                setNotificationMessage('Título e Comentário são obrigatórios.');
                setNotificationType('error');
                setShowNotification(true);
                setLoading(false);
                return;
            }

            const post: CreatePostDTO = { title, comment };

            await create(authData?.token || '', post);
            setLoading(false);
            setTitle('');
            setComment('');
            setNotificationMessage('Publicação criada com sucesso!');
            setNotificationType('success');
            setShowNotification(true);
            fetchPosts();

        } catch (error) {
            handleSaveOrUpdateError('criar', error);
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const postToEdit = posts.find(post => post.id === id);
            if (!postToEdit) {
                console.error(`Post com ID ${id} não encontrado.`);
                return;
            }

            setTitle(postToEdit.title);
            setComment(postToEdit.comment);
            setEditingPostId(id);

        } catch (error) {
            console.error('Erro ao carregar dados para edição:', error);
            handleFetchError();
        }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);

            if (!title || !comment || !editingPostId) {
                setNotificationMessage('Título e Comentário são obrigatórios.');
                setNotificationType('error');
                setShowNotification(true);
                setLoading(false);
                return;
            }

            const post: UpdatePostDTO = { id: editingPostId, title, comment };

            await update(editingPostId, authData?.token || '', post);
            setLoading(false);
            setTitle('');
            setComment('');
            setEditingPostId(null);
            setNotificationMessage('Publicação atualizada com sucesso!');
            setNotificationType('success');
            setShowNotification(true);
            fetchPosts();

        } catch (error) {
            handleSaveOrUpdateError('atualizar', error);
        }
    };

    const handleSaveOrUpdateError = (action: string, error: any) => {
        console.error(`Erro ao ${action} publicação:`, error);
        setNotificationMessage(`Erro ao ${action} publicação. Por favor, tente novamente.`);
        setNotificationType('error');
        setShowNotification(true);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        try {
            await deletar(id, authData?.token || '');
            setNotificationMessage('Publicação excluída com sucesso!');
            setNotificationType('success');
            setShowNotification(true);
            fetchPosts();

        } catch (error) {
            console.error('Erro ao excluir publicação:', error);
            handleFetchError();
        }
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    return (
        <div className='w-screen md:w-[70rem] p-4 sm:py-10 sm:px-20' style={{ backgroundColor: colors.BACKGROUND }}>
            <h1 className='text-3xl font-bold' style={{ color: colors.PRIMARY }}>
                {editingPostId ? 'Editar Publicação' : 'Cadastrar Publicação'}
            </h1>
            <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col w-full sm:w-[45rem] md:w-[70rem] bg-gray-100 p-4 rounded-md'>
                    <div className='flex flex-col sm:flex-row mt-5'>
                        <div className='flex flex-col px-5'>
                            <input
                                className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md outline-0'
                                placeholder="Título da Publicação"
                                value={title}
                                onChange={ev => setTitle(ev.target.value)}
                                type="text"
                                style={{ backgroundColor: colors.WHITE, color: colors.TEXT }}
                            />
                            <input
                                className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md outline-0'
                                placeholder="Comentário da Publicação"
                                value={comment}
                                onChange={ev => setComment(ev.target.value)}
                                type="text"
                                style={{ backgroundColor: colors.WHITE, color: colors.TEXT }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={editingPostId ? handleUpdate : handleSave}
                        className='flex justify-center items-center w-52 my-5 mx-5 font-semibold py-2 rounded-sm'
                        style={{ backgroundColor: colors.BUTTON, color: colors.BUTTON_TEXT }}
                    >
                        {loading ? <Spinner /> : (editingPostId ? 'Atualizar' : 'Cadastrar')}
                    </button>
                </div>
            </div>

            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={closeNotification}
                />
            )}

            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-4' style={{ color: colors.PRIMARY }}>Publicações Cadastradas</h2>
                <ul className='space-y-3'>
                    {posts.map((post, index) => (
                        <li key={index} className='bg-gray-100 p-4 rounded-md'>
                            <h3 className='text-lg font-semibold'>{post.title}</h3>
                            <p className='text-gray-600'>{post.comment}</p>
                            <div className='mt-2'>
                                <button onClick={() => handleEdit(post.id)} style={{background : colors.PRIMARY}} className='text-white px-4 py-2 rounded-md mr-2'>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(post.id)}  style={{background : colors.BACKGROUND , color: colors.PRIMARY}} className='px-4 py-2 rounded-md'>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PostTela;
