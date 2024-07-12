import { Router } from 'express';
import Container from 'typedi';
import ChatController from '../controllers/chat';
import guardMiddleware from '../middlewares/guard';

export default ({ app }: { app: Router }) => {
    const route = Router();
    app.use('/chat', route);
    route.get('/', guardMiddleware, Container.get(ChatController).getChatRooms.bind(ChatController));
    route.post('/', guardMiddleware, Container.get(ChatController).generateChatRoom.bind(ChatController));
    route.delete('/:r_id', guardMiddleware, Container.get(ChatController).deleteChatRoom.bind(ChatController));
    route.get('/:r_id/messages', guardMiddleware, Container.get(ChatController).getMessages.bind(ChatController));
};
