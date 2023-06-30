

 import { Injectable } from "@angular/core";
 import { users } from '../data/users';
 import { user } from "src/models/users/user";
import{HttpClient}from '@angular/common/http';
 import { Observable } from "rxjs";
 import {map} from "rxjs/operators";

 const API_URL="http://localhost:4300/usuarios"

 @Injectable()
 export class UserRepository {
    constructor(private httpClient: HttpClient){    

    }

     public getUsers():Observable< user[]> {
         return this.httpClient.get<user[]>(API_URL).pipe(map(values=>{
            const users: user[]=[];
            for(const value of values){
                 users.push(Object.assign(new user(),value))
            }
           return users;
        }));
    }

}
