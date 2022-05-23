import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {JwtService} from "../jwt/jwt.service";

@Injectable()
export class AuthService {
    constructor(
       @InjectRepository(User)
       private userRepository: Repository<User>,
       private jwtService: JwtService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const checkEmail = await this.userRepository.findOne({
            email: createUserDto.email,
        })
        if (checkEmail) {
            throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.create(createUserDto);
        user.password = hashPassword;
        user.token = this.jwtService.generateToken(user.id);
        await this.userRepository.save(user);
        return {
            statusCode: 201,
            token: user.token,
        }
    }

    async login(createUserDto: CreateUserDto) {
        const checkEmail = await this.userRepository.findOne({email: createUserDto.email,})

        if (!checkEmail) {
            throw new HttpException('Пользователь не существует', HttpStatus.BAD_REQUEST);
        }

        const passwordCorrect = await bcrypt.compare(createUserDto.password, checkEmail.password);
        if (!passwordCorrect) {
            throw new HttpException('Пароль не верный', HttpStatus.BAD_REQUEST);
        }
        console.log(checkEmail);
        checkEmail.token = this.jwtService.generateToken(checkEmail.id);
        await this.userRepository.update(checkEmail.id, checkEmail);
        return {
            statusCode: 201,
            token: checkEmail.token,
        }
    }

}
