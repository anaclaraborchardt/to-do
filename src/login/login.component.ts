import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private userRepository: UserRepository) {
  }
  ngOnInit(): void {

  }
}