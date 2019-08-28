import { Component, OnInit, ViewChild, ViewChildren, ElementRef, Renderer2, AfterViewInit, HostListener, Directive} from '@angular/core';
import { HttpService } from './http.platforms';

import {Table} from './table';

@Component({
    selector: 'platforms-app',
    templateUrl: './html/app.component.html',
    styleUrls: ['./css/app.component.css'],
    providers: [HttpService]
})

export class Platforms {


  @ViewChild ('addRoww') addRow: ElementRef;
  @ViewChild ('wholetable') wholeTable: ElementRef;

  tables: Table;

  constructor(private httpService: HttpService, private renderer: Renderer2, private elRef: ElementRef){}


  ngOnInit(){
    this.httpService.getData().subscribe((data:Table) => {
      this.tables=data;
    })
  }


  onEdit(increased:any){

    if (increased.target.classList.contains("edit")){

      var parent = increased.target.parentNode.parentNode;

      var inner = parent.children;

      var popup = this.renderer.createElement('div');
      this.wholeTable.nativeElement.appendChild(popup);
      this.renderer.addClass(popup, 'popup');
      this.renderer.setProperty(popup, 'ppp');

      popup.style.position = "fixed";
      popup.style.display = "inline-block";
      popup.style.top = "35px";
      popup.style.marginLeft = "25%";
      popup.style.padding = "20px 10px 0";
      popup.style.width = "35%";
      popup.style.background = "gray";


      for(let i = 0; i < 9; i++){
        var blockDiv = '<div class="items">#fff</div>';
        var blockChildren = "";

        for (let j = 0; j < 1; j++) {
          blockChildren += '<p class="textItems"></p><textarea class="textareaItems"></textarea>';
        }

        blockDiv = blockDiv.replace(/#fff/, blockChildren);
        popup.innerHTML += blockDiv;

      }


      var items = this.wholeTable.nativeElement.querySelectorAll('div.items');
      var textItems = this.wholeTable.nativeElement.querySelectorAll('p.textItems');
      var textareaItems = this.wholeTable.nativeElement.querySelectorAll('textarea');

      for (let k = 0; k < items.length; k++) {

        textItems[k].innerHTML = 1+k;


        textareaItems[k].addEventListener('blur', () => {

            for (let l = 0; l < textareaItems.length; l++) {

              if (textareaItems[l].value !== '') {
                inner[l].innerHTML = textareaItems[l].value;
              } else if (textareaItems[l].value == ''){
                inner[l].innerHTML = inner[l].innerHTML;
              }

            }

         });

      }


      var button = this.renderer.createElement('div');
      popup.appendChild(button);
      this.renderer.addClass(button, 'button');
      button.style.margin = "10px auto";
      button.style.border = "solid 1px #000";
      button.style.padding = "4px";
      button.style.cursor = "pointer";
      button.style.background = "#ddde00";
      button.style.height = "24px";
      button.style.textDecoration = "none";
      button.style.textAlign = "center";
      button.style.width = "100px";
      button.innerHTML = "Save";

      document.querySelector('.button').addEventListener('click', () => {
          this.renderer.removeChild(this.wholeTable.nativeElement, popup);

       });

    }

  }


  onDelete(increased:any){

    if (increased.target.classList.contains("delete")){

      increased.target.parentNode.parentNode.remove();
    }
  }


  onAdd(increased:any){

    for(let m = 0; m < 1; m++){
      var mainDiv = '<div class="addDiv">#ddd</div>';
      var divChildren = "";

      for (let n = 0; n < 10; n++) {

        divChildren += '<div class="divD"></div>';

      }

      mainDiv = mainDiv.replace(/#ddd/, divChildren);

      var elemD = this.renderer.createElement('div');
      this.addRow.nativeElement.innerHTML += mainDiv;

    }

    var butEdit = this.renderer.createElement('a');
    this.renderer.addClass(butEdit, 'edit');
    this.renderer.setProperty(butEdit, 'innerHTML', 'edit');

    var butDelete = this.renderer.createElement('a');
    this.renderer.addClass(butDelete, 'delete');
    this.renderer.setProperty(butDelete, 'innerHTML', 'delete');

     var div = this.addRow.nativeElement.querySelectorAll('.divD');

    for (let k = 0; k < div.length; k++) {
      this.renderer.appendChild(div[k], butEdit);
      this.renderer.appendChild(div[k], butDelete);
    }



  }

}
