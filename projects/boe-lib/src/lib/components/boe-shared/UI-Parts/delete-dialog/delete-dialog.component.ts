import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatahandlingService } from 'projects/boe-lib/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  deleteEntityVisible: boolean;
  message: string;

  constructor(private datahandlingService: DatahandlingService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.datahandlingService.deleteMessage$
        .subscribe(message => this.message = message));

    this.subscriptions.add(
      this.datahandlingService.deleteEntityVisible$
        .subscribe(visible => this.deleteEntityVisible = visible));
  }

  applyDeleteDialog() {
    this.datahandlingService.deleteEntityConfirmed();
  }

  closeDeleteDialog() {
    this.datahandlingService.hideDeleteEntity();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
