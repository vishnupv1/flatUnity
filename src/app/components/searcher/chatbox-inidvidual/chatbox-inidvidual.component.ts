import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
@Component({
  selector: 'app-chatbox-inidvidual',
  templateUrl: './chatbox-inidvidual.component.html',
  styleUrls: ['./chatbox-inidvidual.component.css']
})
export class ChatboxInidvidualComponent {
  senderId: string
  recieverId: string
  name: string
  gender: string
  text: string = ''
  chats!: Observable<any>
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserServiceService) {
    this.senderId = this.data.senderId
    this.recieverId = this.data.recieverId
    this.name = this.data.recieverName
    this.gender = this.data.recieverGender
  }
  ngOnInit() {
    this.userService.loadChats(this.senderId, this.recieverId).subscribe((res) => {
      this.chats = res
    })
  }
  sendMessage(text: string) {
    const data = {
      senderId: this.senderId,
      recieverId: this.recieverId,
      messageContent: text
    }
    this.userService.sendMessage(data).subscribe((res) => {
      this.text = ''
    })
  }
}
