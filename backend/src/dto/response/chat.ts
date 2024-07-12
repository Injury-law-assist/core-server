import { CommonResponseDTO } from '.';

export interface MessageDTO {
    m_id: number;
    cr_id: number;
    u_id: number;
    m_content: string;
    m_created_at: Date;
    m_updated_at: Date;
}

export interface ChatRoomDTO {
    cr_id: number;
    title: string;
    u_id: number;
    cr_created_at: Date;
    cr_updated_at: Date;
}

export interface GetMessagesResponseDTO extends CommonResponseDTO<MessageDTO[]> {}
export interface GetChatRoomsResponseDTO extends CommonResponseDTO<ChatRoomDTO[]> {}
export interface GenerateChatRoomResponseDTO extends CommonResponseDTO<ChatRoomDTO> {}
export interface DeleteChatRoomResponseDTO extends CommonResponseDTO<null> {}
