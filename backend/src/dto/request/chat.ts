export interface CreateChatRoomRequestDTO {
    title: string;
    u_id: number;
}

export interface GetChatRoomRequestDTO {
    r_id: number;
}

export interface CreateMessageRequestDTO {
    r_id: number;
    u_id: number;
    m_content: string;
}

export interface GetMessageRequestDTO {
    m_id: number;
}
