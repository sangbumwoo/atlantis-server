import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async create(user: User): Promise<User> {

        let result = await this.usersRepository.save(user);

        const request = require('request');

        // UserInfo which we need to send message. Assume that user table has push_token field.
        const userInfo = {
            push_token: 'fyOjTY-zSjSSGB0IgSPvFr:APA91bE0H62EsP9bDVFQX5BgQXpPBT_1o8J3pLZ2MIlnevF8T2MgPLSE2AQ-kZ7VK_ymdFbk0LW9t1QaQMSJSQqMsdVPGrFRKxBVz1QGfzYNAfPi8Igvciu6bwYgkkR9xI9MAXWNwM5a',
        }

        const message = {
            title: `Notification for user creation`,
            body: `UserId ${result.id} UserName ${result.fullName} was created`,
        }

        const options = {
            url: 'https://kapi.kakao.com/v2/push/send',
            method: 'POST',
            headers: {
                'Authorization': 'KakaoAK 795b9b3c9b9883a36c6ba4d1ea86f043',
                // 'Content-Type': 'application/x-www-form-urlencoded' // Not required because POST method default is 'application/x-www-form-urlencoded'. In case of sending json data, we need to specify "application/json"
            },
            form: {
                uuids: '["1234"]',
                bypass: 'true',
                push_message: `{"for_apns":{"push_token":"${userInfo.push_token}","message":{"title":"${message.title}","body":"${message.body}"}},"for_fcm":{"push_token":"${userInfo.push_token}","notification":{"title":"${message.title}","body":"${message.body}"}}}`
            }
        }

        request.post(options, function (err, httpResponse, body) {
            console.log('httpResponse.statusCode : ', httpResponse.statusCode);
        })

        return result;
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async update(user: User) {
        this.usersRepository.save(user);
    }

    async delete(id: string) {
        this.usersRepository.delete(id);
    }

}

