import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { io } from 'socket.io-client';
import { apiUrl } from 'src/constant';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  senderId!: string
  recieverId!: string
  // name: string
  // gender: string
  text: string = ''
  chats!: any[]
  chatRooms!: any[]
  socket: any
  userId!: string
  openRoom: boolean = false
  recieverName: string = ''
  constructor(
    private userService: UserServiceService) {
    // this.senderId = this.data.senderId
    // this.recieverId = this.data.recieverId
    // this.name = this.data.recieverName
    // this.gender = this.data.recieverGender

    this.socket = io(apiUrl)

    this.socket.on("connect", () => {
      console.log(this.socket.connected);
    });
    this.userService.onNewMessage().subscribe((message) => {
      this.chats.push(message);
    });
  }
  ngOnInit() {
    this.userService.loadChatmates().subscribe((res) => {
      this.chatRooms = res.chatroomToDisplay
      this.userId = res.userId
      console.log(res);

    })
  }
  sendMessage(text: string) {
    const data = {
      senderId: this.senderId,
      recieverId: this.recieverId,
      content: text
    }
    this.userService.sendMessage(data).subscribe((res) => {
      this.text = ''
      this.ngOnInit()
      this.scrollToBottom();

    })
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  openChatroom(recieverId: string, senderid: string, name: string) {
    this.openRoom = true
    this.recieverName = name
    this.senderId = senderid
    this.recieverId = recieverId
    console.log(this.senderId, this.recieverId);

    this.userService.loadChats(senderid, recieverId).subscribe((res) => {
      this.chats = res.chats
    })
  }
}
