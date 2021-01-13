import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async create(user: User): Promise<User> {

        const request = require('request');

        const options = {
            url: 'https://kapi.kakao.com/v2/push/send',
            method: 'POST',
            headers: {
                'Authorization': 'KakaoAK 795b9b3c9b9883a36c6ba4d1ea86f043',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                uuids: '["1234"]',
                bypass: 'true',
                push_message: '{"for_apns":{"push_token":"fyOjTY-zSjSSGB0IgSPvFr:APA91bE0H62EsP9bDVFQX5BgQXpPBT_1o8J3pLZ2MIlnevF8T2MgPLSE2AQ-kZ7VK_ymdFbk0LW9t1QaQMSJSQqMsdVPGrFRKxBVz1QGfzYNAfPi8Igvciu6bwYgkkR9xI9MAXWNwM5a","message":{"title":"message-title","body":"message-body"}},"for_fcm":{"push_token":"fyOjTY-zSjSSGB0IgSPvFr:APA91bE0H62EsP9bDVFQX5BgQXpPBT_1o8J3pLZ2MIlnevF8T2MgPLSE2AQ-kZ7VK_ymdFbk0LW9t1QaQMSJSQqMsdVPGrFRKxBVz1QGfzYNAfPi8Igvciu6bwYgkkR9xI9MAXWNwM5a","notification":{"title":"message-title","body":"message-body"}}}'
            }
        }

        request.post(options, function (err, httpResponse, body) {
            console.log('httpResponse.statusCode : ', httpResponse.statusCode);
            if (httpResponse.statusCode != 200) {
                console.log('err, httpResponse, body', err, httpResponse, body);
            }
        })

        return await this.usersRepository.save(user);
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

