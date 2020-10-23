import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  public copyrightStatement: string;

  constructor(@Inject(LOCALE_ID) public locale) {
    this.title  = 'BusinessObjectEntity-Editor';
    this.copyrightStatement = `© Proleit AG, ${new Date().getFullYear()} All rights reserved`;
  }
}
