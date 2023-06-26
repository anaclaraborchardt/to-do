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

// import { Injectable } from "@angular/core";
// import { users } from '../data/users';
// import { user } from "src/models/users/user";
// import{HttpClient}from '@angular/common/http';
// import { Observable } from "rxjs";
// import {map} from "rxjs/operators";

// const API_URL="https://run.mocky.io/v3/62f94d04-a430-4a64-a1bb-2b3d019cbf58"

// @Injectable()
// export class UserRepository {
//     constructor(private httpClient: HttpClient){    

//     }

//     public getUsers():Observable< user[]> {
//         return this.httpClient.get<user[]>(API_URL).pipe(map(values=>{
//             const users: user[]=[];
//             for(const value of values){

//                 users.push(Object.assign(new user(),value))
//             }
//             return users;
//         }));
//     }

// }
