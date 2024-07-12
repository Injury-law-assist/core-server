import { Inject, Service } from 'typedi';
import UserRepository from '../repositories/user';
import { UserJoinRequestDTO, UserLoginRequestDTO } from '../dto/request/user';
import { UserJoinResponseDTO, UserLoginResponseDTO } from '../dto/response/user';
import JwtService from './jwt';
/**[ ] bcrypt 추가 */
@Service()
export default class AuthService {
    constructor(
        @Inject(() => UserRepository) private readonly userRepository: UserRepository,
        @Inject(() => JwtService) private readonly jwtService: JwtService,
    ) {}

    /**
     * 사용자 로그인 처리
     * @param {UserLoginRequestDTO} { email, password }
     * @returns {Promise<UserLoginResponseDTO>}
     */
    login = async ({ email, password }: UserLoginRequestDTO): Promise<UserLoginResponseDTO> => {
        const user = await this.userRepository.findOneByPk({ email });

        if (!user) {
            throw new Error('존재하지 않는 아이디입니다.');
        }

        if (user.u_password !== password) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        const { u_password, ...payload } = user; // 비밀번호 필드 제외한 페이로드 생성
        const [accessToken, refreshToken] = await this.generateToken(payload);

        const userLoginResponseDTO: UserLoginResponseDTO = {
            statusCode: 200,
            message: '로그인에 성공하였습니다.',
            data: { accessToken, refreshToken },
        };
        return userLoginResponseDTO;
    };

    /**
     * 사용자 가입 처리
     * @param {UserJoinRequestDTO} user
     * @returns {Promise<UserJoinResponseDTO>}
     */
    join = async (user: UserJoinRequestDTO): Promise<UserJoinResponseDTO> => {
        const existingUser = await this.userRepository.findOneByPk({ email: user.email });
        if (existingUser) {
            throw new Error('이미 존재하는 이메일입니다.');
        }

        await this.userRepository.create(user);

        const createdUser = await this.userRepository.findOneByPk({ email: user.email });
        const userJoinResponseDTO: UserJoinResponseDTO = {
            statusCode: 200,
            message: '가입에 성공하였습니다.',
            data: createdUser,
        };
        return userJoinResponseDTO;
    };

    /**
     * JWT 토큰 생성 메서드
     * @param {Object} payload
     * @returns {Promise<[string, string]>} [accessToken, refreshToken]
     */
    private generateToken = async (payload: Object): Promise<[string, string]> => {
        return [this.jwtService.generateAccessToken(payload), this.jwtService.generateRefreshToken(payload)];
    };
}
