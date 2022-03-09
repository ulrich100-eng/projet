import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public clients: Client[];

  constructor(private clientService: ClientService) { this.clients = [] ;}


  ngOnInit() {
    this.getClients();
  }

  public getClients(): void {

    this.clientService.getClients().subscribe(
      {
        next: ((response: Client[]) => {
          this.clients = response;
        }),
       });

  }
    public onOpenModal(client: Client|null, mode: string): void{

      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle','modal');
      if(mode === 'add'){
        button.setAttribute('data-target','#addClientModal');
      }
      if(mode === 'edit'){
        button.setAttribute('data-target','#updateClientModal');
      }
      if(mode === 'delete'){
        button.setAttribute('data-target','#deleteClientModal');
      }
      container?.appendChild(button);
      button.click();
    }

}
