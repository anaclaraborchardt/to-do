import { Injectable } from "@angular/core";
 import { properties } from "src/models/users/properties";
import{HttpClient}from '@angular/common/http';
 import { Observable } from "rxjs";
 import {map} from "rxjs/operators";

 const API_URL="http://localhost:4300/properties"

 @Injectable()
 export class PropertiesRepository {
    constructor(private httpClient: HttpClient){    

    }

     public getProperties():Observable< properties[]> {
         return this.httpClient.get<properties[]>(API_URL).pipe(map(values=>{
            const propriedades: properties[]=[];
            for(const value of values){
                propriedades.push(Object.assign(new properties(),value))
            }
           return propriedades;
        }));
    }

}