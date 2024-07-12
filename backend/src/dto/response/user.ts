import { CommonResponseDTO } from '.';

export interface UserDTO {
    u_id: number;
    u_email: string;
    u_password: string;
    u_nickname: string;
    u_created_at: Date;
    u_updated_at: Date;
}

export interface UserLoginDTO {
    refreshToken: string;
    accessToken: string;
}

export interface UserJoinResponseDTO extends CommonResponseDTO<UserDTO> {}
export interface UserLoginResponseDTO extends CommonResponseDTO<UserLoginDTO> {}
