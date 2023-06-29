import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  setResultadoQuiz(resultado: string): void {
    console.log("Entrei no set do quiz")
    this.resultadoQuiz = resultado;
  }


  getResultadoQuiz(): string | null {
    console.log("Entrei no get do quiz")
    return this.resultadoQuiz;
  }
}