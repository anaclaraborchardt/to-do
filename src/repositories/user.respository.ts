import { Injectable } from "@angular/core";
import {users} from '../data/users';

@Injectable()
export class UserRepository{

    getHello(): string{
        return"Hello World"
    }

    getUsers(){
        return users;
    }

}