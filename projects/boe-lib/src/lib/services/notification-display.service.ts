import { Injectable } from '@angular/core';

import { NotificationComponent } from '../components/boe-shared/UI-Parts/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationDisplayService {
  constructor(private notificationComponent: NotificationComponent) {}

  showError(message: string, time: number = 5000) {
    this.notificationComponent.showError(message, time);
  }

  showWarning(message: string, time: number = 5000) {
    this.notificationComponent.showWarning(message, time);
  }

  showInfo(message: string, time: number = 1200) {
    this.notificationComponent.showInfo(message, time);
  }

  showSuccess(message: string, time: number = 1200) {
    this.notificationComponent.showSuccess(message, time);
  }
}
