
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class TesteService {
    
    tema = new Subject<string>();

    getTema(): Observable<string> {
        return this.tema.asObservable();
    }

    setTema(value: string): void {
        return this.tema.next(value);
    }

}