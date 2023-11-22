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
  isTyping: boolean = false
  typingId!: string
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
    this.socket.on('typing', () => this.isTyping = true)
    this.socket.on('stop typing', () => this.isTyping = false)

    // Add this line to listen for 'typing' and 'stop typing' events specific to the current chat room
    this.socket.on('typing', (data: any) => {
      this.typingId = data.senderId
      if (data.chatId === this.chats[0]._id && this.senderId != data.senderId) {
        this.isTyping = true;
      }
    });

    this.socket.on('stop typing', (data: any) => {
      if (data.chatId === this.chats[0]._id && this.senderId != data.senderId) {
        this.isTyping = false;
      }
    });
  }
  ngOnInit() {
    this.userService.loadChatmates().subscribe((res) => {
      this.chatRooms = res.chatroomToDisplay
      this.userId = res.userId

    })
  }
  sendMessage(text: string) {
    const data = {
      senderId: this.senderId,
      recieverId: this.recieverId,
      content: text,
      date: Date.now()
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

    this.userService.loadChats(senderid, recieverId).subscribe((res) => {
      this.chats = res.chats
    })
  }
  typingHandler(e: Event) {
    const data = {
      senderId: this.senderId,
      recieverId: this.recieverId,
      chatId: this.chats[0]._id, // Assuming _id is the chat ID
    };

    this.socket.emit('typing', data);

    let lastTypingTime = new Date().getTime();
    var timerLength = 6000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && this.isTyping) {
        this.socket.emit("stop typing", this.chats[0]._id);
      }
    }, timerLength);
  };
}
