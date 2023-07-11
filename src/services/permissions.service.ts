import { Injectable } from "@angular/core";
import { cards } from "src/models/users/cards";
import { CardsRepository } from "src/repositories/cards.repository";
import { PropertiesRepository } from "src/repositories/properties.repository";


@Injectable()
export class PermissionsService {

    constructor(
        private cardRepository: CardsRepository,
        private propertiesRespository:PropertiesRepository

    ){

    }

    //service = intermediador
    public setCardPermissions():void{
        this.cardRepository.getCards().subscribe({
            next: (valor) => {
              localStorage.setItem("CardPermissions", JSON.stringify(valor));
            }
        });
    }

    public getCardPermissions(permission:string):boolean{
        let id: string = localStorage.getItem("meuParametro"); 
        let listaCardPermission: cards[] = JSON.parse(localStorage.getItem("CardPermissions"));
        for (let cardPermissions of listaCardPermission) {
            if (cardPermissions.id_usuario === id
                && cardPermissions.permissions === permission) {
                    return true
                }
            }
    }

    public setPropertiesPermissions(): void{
        this.propertiesRespository.getProperties().subscribe({
            next:(valor) => {
                localStorage.setItem("PropertiesPermissions", JSON.stringify(valor));
            }
        })
    }
}