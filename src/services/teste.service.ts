
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class TesteService {
    private contaCadastrada: boolean = false;
    private readonly STORAGE_KEY = 'authState';
    private resultadoQuiz: string | null = null;
  
  
    constructor() {
      this.contaCadastrada = this.getAuthStateFromStorage();
    }
  
  
    get isContaCadastrada(): boolean {
      return this.contaCadastrada;
    }
  
  
    setContaCadastrada(value: boolean): void {
      this.contaCadastrada = value;
      this.saveAuthStateToStorage();
    }
  
  
    private getAuthStateFromStorage(): boolean {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      return storedState ? JSON.parse(storedState) : false;
    }
  
  
    private saveAuthStateToStorage(): void {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contaCadastrada));
    }

}