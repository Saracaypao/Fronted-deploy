import '../assets/ComentStyle.css';
import Comment from "../api/commentsService";
import Like from '../api/likeCommentsService';
import AllComments from '../api/allCommentsService';
import { useEffect, useState, useCallback } from "react";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComentSection = () => {

    const comment = new Comment();
    const like = new Like();
    const all = new AllComments();
    const [currentUserLikes, setCurrentUserLikes] = useState([]);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        comment: '',
        user: '',
        hidden: false,
        Me_gusta: [],
    });

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('correo');

    const handlePostComment = async () => {
        try {
            const response = await comment.createComment(
                newComment.comment,
                token
            );

            if (response === 201) {
                setNewComment(prev => ({ ...prev, comment: '' }));
                handleGetComments();
                toast.success("Comentario publicado correctamente");
            }
        } catch (error) {
            toast.error("Error al publicar el comentario. Por favor, intente nuevamente");
            console.error('Error al publicar el comentario:', error);
        }
    };

    const handleGetComments = useCallback(async () => {
        try {
            const { comment } = await all.getComments();
            if (comment && comment.length > 0) {
                setComments(comment);
            } else {
                console.error('Error con la estructura de la respuesta:', comment);
            }
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    }, []);

    useEffect(() => {
        handleGetComments();
    }, [handleGetComments]);

    const handleLikeComment = async (commentId) => {
        try {
            let updatedComments = [...comments];
            const response = await like.likeComment(commentId, token);
            if (response.status === 200) {
                updatedComments = updatedComments.map((comment) => {
                    if (comment._id === commentId) {
                        const userLiked = currentUserLikes.includes(commentId);
                        if (userLiked) {
                            comment.Me_gusta = comment.Me_gusta.filter(
                                (email) => email !== userEmail
                            );
                        } else {
                            comment.Me_gusta.push(userEmail);
                        }
                    }
                    return comment;
                });
                setComments(updatedComments);
                setCurrentUserLikes(
                    userLiked
                        ? currentUserLikes.filter((id) => id !== commentId)
                        : [...currentUserLikes, commentId]
                );
            }
        } catch (error) {
            console.error('Error al dar like al comentario:', error);
        }
    };


    const updateLikeIconColor = (comment) => {
        const isLikedByCurrentUser = comment.Me_gusta.some((liked) => liked.correo === userEmail);

        if (isLikedByCurrentUser) {
            comment.icon.style.filter = 'invert(60%)';
        } else {
            comment.icon.style.filter = 'none';
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div className='ContentComent'>
            <div>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover />
            </div>
            <div className='HomeHeader'>
                <Link className='Back' to='/home' > <img alt='BackIcon' src='back.png' style={{ width: '40px' }} /> </Link>
                <img className="LogoHome" alt="Logo-Financiamigos" src="logo.png" />
                <p className='FText'> Financiamigos </p>
                <img className='Menu' alt='Menu-Hamburguesa' src='logout.png' onClick={logOut} />
            </div>
            <div className='ComentsSection'>
                <div className='PostComent'>
                    <img className='ProfileImage' alt='PersonalImage' src='user.png' />
                    <textarea
                        className='PHText'
                        placeholder='¿Cuál es tu duda?'
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    />
                    <button className='Post' onClick={handlePostComment}> Publicar </button>
                </div>
                <div className='Coments'>
                    {comments.map((comment, index) => (
                        <div className='Coment' key={comment._id}>
                            <div className='UsersLine'>
                                <img className='ProfileUsers' alt='ProfileUsers' src='user.png' />
                                <div>
                                    <span className='ContenBoxComment'>
                                        <p className='NameUsers'>{comment.user?.usuario} - {moment(comment.createdAt).fromNow()}</p>
                                    </span>
                                    <p className='textP'>{comment.comentario}</p>
                                    <span className='InteractionSection'>
                                        <img
                                            style={{
                                                filter: comment.Me_gusta.some((liked) => liked.correo === userEmail) ? 'none' : 'invert(60%)'
                                            }}
                                            className='heartIcon'
                                            src='heart.png'
                                            onClick={() => handleLikeComment(comment._id)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComentSection;

