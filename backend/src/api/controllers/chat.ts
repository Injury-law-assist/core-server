import { NextFunction, Request, Response } from 'express';
import ChatService from '../../services/chat';
import { Inject, Service } from 'typedi';
import { Payload } from '../../types/express';
import { GetChatRoomsResponseDTO, GetMessagesResponseDTO, GenerateChatRoomResponseDTO, DeleteChatRoomResponseDTO, ChatRoomDTO } from '../../dto/response/chat';
/**
 * CHECKLIST
 */
@Service()
export default class ChatController {
    constructor(@Inject(() => ChatService) private readonly chatService: ChatService) {}

    getMessages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { u_id }: { u_id: number } = req.user as Payload;
            const r_id: number = parseInt(req.params.r_id);
            const messageResponseDTO: GetMessagesResponseDTO = await this.chatService.getMessages({ r_id, u_id });
            console.log(messageResponseDTO);
            return res.status(200).json(messageResponseDTO);
        } catch (err) {
            return next(err);
        }
    };
    getChatRooms = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { u_id }: { u_id: number } = req.user as Payload;
            const chatRoomResponseDTO: GetChatRoomsResponseDTO = await this.chatService.getChatRooms({ u_id });
            return res.status(200).json(chatRoomResponseDTO);
        } catch (err) {
            return next(err);
        }
    };
    generateChatRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { u_id }: { u_id: number } = req.user as Payload;

            const { title }: { title: string } = req.body;
            const chatRoomResponseDTO = await this.chatService.generateChatRoom({ u_id, title });
            return res.status(200).json(chatRoomResponseDTO);
        } catch (err) {
            return next(err);
        }
    };
    deleteChatRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const r_id: number = parseInt(req.params.r_id);
            const chatRoomResponseDTO: DeleteChatRoomResponseDTO = await this.chatService.deleteChatRoom({ r_id });
            return res.status(200).json(chatRoomResponseDTO);
        } catch (err) {
            return next(err);
        }
    };
}
