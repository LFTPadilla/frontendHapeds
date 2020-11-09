import { Component, OnInit } from '@angular/core';
import { BacklogBusinessService } from 'src/app/business/master/backlog-business.service ';
import { Requirement } from 'src/app/model/Requirement';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  backlog: Requirement[] = [];

  constructor(private backlogBussines: BacklogBusinessService) {
    this.getBacklog();
  }


  getBacklog(){
    this.backlogBussines.GetBacklog().then(x=> {
      this.backlog = x
      console.log("Se cargó correctamente el Backlog "+x);
    }).catch(x => {
      console.log("error "+x)
    });
  }

  ngOnInit(): void {
  }

}
