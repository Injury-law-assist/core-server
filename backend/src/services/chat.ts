import { Inject, Service } from 'typedi';
import ChatRepository from './../repositories/chat';
import { ChatRoomDTO, DeleteChatRoomResponseDTO, GenerateChatRoomResponseDTO, GetChatRoomsResponseDTO, GetMessagesResponseDTO } from '../dto/response/chat';
import MessageRepository from '../repositories/message';

@Service()
export default class ChatService {
    constructor(
        @Inject(() => ChatRepository) private readonly chatRepository: ChatRepository,
        @Inject(() => MessageRepository) private readonly messageRepository: MessageRepository,
    ) {}

    /**
     * Retrieve messages for a specific chat room
     * @param r_id - Chat room ID
     */
    async getMessages({ r_id, u_id }: { r_id: number; u_id: number }): Promise<GetMessagesResponseDTO> {
        // TODO: Implement pagination (scroll-based)

        const foundChatRoom: ChatRoomDTO = await this.chatRepository.findOneByRoomId({ r_id });
        if (!foundChatRoom) throw new Error('채팅방이 존재하지않습니다.');
        if (foundChatRoom.u_id !== u_id) throw new Error('접근 권한이 없습니다.');
        const foundMessages = await this.messageRepository.findAllByRoomId({ r_id });
        return {
            message: '성공적으로 조회하였습니다.',
            statusCode: 200,
            data: foundMessages,
        };
    }

    /**
     * Retrieve chat rooms for a specific user
     * @param u_id - User ID
     */
    async getChatRooms({ u_id }: { u_id: number }): Promise<GetChatRoomsResponseDTO> {
        // TODO: Implement pagination (scroll-based)
        const foundChatRooms = await this.chatRepository.findAllByUid({ u_id });
        return {
            message: '성공적으로 조회하였습니다.',
            statusCode: 200,
            data: foundChatRooms,
        };
    }

    /**
     * Generate a new chat room for a specific user
     * @param u_id - User ID
     */
    async generateChatRoom({ u_id, title }: { u_id: number; title: string }): Promise<GenerateChatRoomResponseDTO> {
        const { insertId } = await this.chatRepository.create({ u_id, title });
        const newChatRoom = await this.chatRepository.findOneByRoomId({ r_id: insertId });
        return {
            message: '정상적으로 채팅방이 생성되었습니다.',
            statusCode: 200,
            data: newChatRoom,
        };
    }

    /**
     * Delete a chat room by its ID
     * @param r_id - Chat room ID
     */
    async deleteChatRoom({ r_id }: { r_id: number }): Promise<DeleteChatRoomResponseDTO> {
        // TODO: Check if the chat room is owned by the user
        // TODO: Validate if the chat room exists
        await this.chatRepository.delete({ r_id });
        return {
            message: '삭제가 완료되었습니다.',
            statusCode: 200,
        };
    }
}
