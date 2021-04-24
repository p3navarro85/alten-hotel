import { Component, OnInit } from '@angular/core';
import { MessageNotifierService, MessageType } from '../../services/message-notifier.service';
declare var jQuery: any;

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  message: String;
  messageType: MessageType;
  modalTitle: String;
  details: String;
  constructor(
    private messageNotifier: MessageNotifierService
  ) { }

  ngOnInit(): void {
    this.message = "Info";
    this.messageType = MessageType.Info;
    this.modalTitle = "Info";
    this.messageNotifier.BehaviourSubject.subscribe(
      (show) => {
        if(show){
          this.message = this.messageNotifier.message;
          this.details = this.messageNotifier.details;
          this.messageType = this.messageNotifier.messageType;
          switch (this.messageNotifier.messageType) {
            case MessageType.Info:
              this.modalTitle = "Info";
              break;
            case MessageType.Success:
              this.modalTitle = "Success";
              break;
            case MessageType.Warning:
              this.modalTitle = "Warning";
              break;
            default:
              this.modalTitle = "Error";
              break;
          }
          jQuery('#messageModal').modal('show'); 
        }else{
          jQuery('#messageModal').modal('hide');
        }
      }
    ) 
  }

}
