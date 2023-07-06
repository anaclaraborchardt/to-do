import { Injectable } from "@angular/core";
 import { cards } from "src/models/users/cards";
import{HttpClient}from '@angular/common/http';
 import { Observable } from "rxjs";
 import {map} from "rxjs/operators";

 const API_URL="http://localhost:4300/cards"

 @Injectable()
 export class CardsRepository {
    constructor(private httpClient: HttpClient){    

    }

     public getCards():Observable< cards[]> {
         return this.httpClient.get<cards[]>(API_URL).pipe(map(values=>{
            const card: cards[]=[];
            for(const value of values){
                card.push(Object.assign(new cards(),value))
            }
           return card;
        }));
    }

}