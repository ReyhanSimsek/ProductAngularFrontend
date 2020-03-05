import { Component } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import {Products} from '../app/Products';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EMutfakWeb';
  closeResult: string;
  products:Products[]=[]; 
  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.GetAll();
  }
  public GetAll(){
    this.http.get<Products[]>("http://localhost:52670/api/product").subscribe(p => {this.products = p;
  console.log(p);},err=>console.log(err));
}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
