import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';
import { user } from 'src/models/users/user';

interface Conta {
  id: string;
  nome: string;
  email: string;
  senha: string;
}


@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})

export class ContaComponent implements OnInit {
  users: user[];
  
  constructor(private router: Router, private authService: AuthService) { }
  contaLogada: Conta;
  contaCadastrada: number;
  listaContas: Conta[] = [];
  cadastro: any = {};
  contaExistente: boolean = false;
  pagina: string = 'cadastro';

  cadastrar() {
    
      const conta: Conta = {
      id: this.cadastro.id,
      nome: this.cadastro.nome,
      email: this.cadastro.email,
      senha: this.cadastro.senha, 
    };
 
      this.listaContas.push(conta);
      localStorage.setItem("contas", JSON.stringify(this.listaContas));
      // this.users = this.achaUsuario();
      this.cadastro = {};

    }

    ngOnInit() {
      const contas = localStorage.getItem('contas');
    if (contas) {
      this.listaContas = JSON.parse(contas);
    }
  }

  trocarPagina() {
    if (this.pagina == 'login') {
      this.pagina = 'cadastro';
    } else if (this.pagina == 'cadastro') {
      this.pagina = 'login';
    } 
  }

  login() {
    const idLogin = this.cadastro.id;
    const senhaLogin = this.cadastro.senha;
    let valido = false;
  
    for (const conta of this.listaContas) {
      if (conta.id === idLogin && conta.senha === senhaLogin) {
        valido = true; 
        this.authService.setContaCadastrada(true);
        this.contaLogada = conta; 
        localStorage.setItem("Conta logada", JSON.stringify(this.contaLogada));
        break;
      }
    }
  
    if (valido) {
     
      this.cadastro.id = '';
      this.cadastro.senha = '';
      
    } else {
      
      alert("Email ou senha inválidos!");
      this.contaCadastrada = 3;
      localStorage.setItem("Número", JSON.stringify(this.contaCadastrada));
    }
  }

  // achaUsuario(): user[] {
  //   const users: user[] = this.listaContas.map((conta: Conta) => {
  //     const newUser: user = {
  //       id: conta.id,
  //       name: conta.nome,
  //       groups: [],
  //       cardPermissions: ['Add'],
  //       propertiesPermissions: ['Add'], 
  //     };
  //     return newUser;
  //   });
  //   return users;
  // }
  
}
