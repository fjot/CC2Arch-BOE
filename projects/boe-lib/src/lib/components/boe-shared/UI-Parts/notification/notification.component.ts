import { Component } from '@angular/core';

import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'lib-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    constructor(private notificationService: NotificationService) {}

    showSuccess(message: string, time: number = 1200 ): void {
      this.notificationService.show({
          content: message,
          hideAfter: time,
          position: { horizontal: 'right', vertical: 'top' },
          animation: { type: 'fade', duration: 800 },
          type: { style: 'success', icon: true }
      });
    }

    showInfo(message: string, time: number = 1200 ): void {
      this.notificationService.show({
          content: message,
          hideAfter: time,
          position: { horizontal: 'right', vertical: 'top' },
          animation: { type: 'fade', duration: 800 },
          type: { style: 'info', icon: true }
      });
    }

    showWarning(message: string, time: number = 1200 ): void {
      this.notificationService.show({
          content: message,
          hideAfter: time,
          position: { horizontal: 'right', vertical: 'top' },
          animation: { type: 'fade', duration: 800 },
          type: { style: 'warning', icon: true }
      });
    }

    showError(message: string, time: number = 1200 ): void {
      this.notificationService.show({
          content: message,
          hideAfter: time,
          position: { horizontal: 'right', vertical: 'top' },
          animation: { type: 'fade', duration: 800 },
          type: { style: 'error', icon: true }
      });
    }
}
