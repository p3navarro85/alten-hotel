import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum MessageType {
  Info = "alert-primary",
  Success = "alert-success",
  Warning = "alert-warning",
  Error = "alert-danger",
}

@Injectable({
  providedIn: 'root'
})
export class MessageNotifierService {
  message: string;
  details: String;
  messageType: MessageType;
  BehaviourSubject = new BehaviorSubject(false);

  constructor() { }

  showMessageInfo(message, details = ""){
    this.message = message;
    this.details = details;
    this.messageType = MessageType.Info;
    this.BehaviourSubject.next(true);
  }

  showMessageSuccess(message, details = ""){
    this.message = message;
    this.details = details;
    this.messageType = MessageType.Success;
    this.BehaviourSubject.next(true);
  }

  showMessageWarning(message, details = ""){
    this.message = message;
    this.details = details;
    this.messageType = MessageType.Warning;
    this.BehaviourSubject.next(true);
  }

  showMessageError(message, details = ""){
    this.message = message;
    this.details = details;
    this.messageType = MessageType.Error;
    this.BehaviourSubject.next(true);
  }
}
