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
  chatRoomId!: string
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
  isOnline!: string
  unreadMessages: any[] = []
  unreadId!: string
  friendList: boolean = true
  chatList: boolean = false
  constructor(
    private userService: UserServiceService) {
    // this.senderId = this.data.senderId
    // this.recieverId = this.data.recieverId
    // this.name = this.data.recieverName
    // this.gender = this.data.recieverGender

    this.socket = io(apiUrl)
    this.socket.on("connect", (data: any) => {
      this.isOnline
    });

    this.userService.onNewMessage().subscribe((message: any) => {
      try {
        if (message.chatRoomId == this.chatRoomId) {
          this.chats.push(message);
        }
        else {
          this.unreadMessages.push(message);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
    // this.socket.on('typing', () => this.isTyping = true)

    this.socket.on('typing', (data: any): any => {
      this.typingId = data.senderId
      if (data.chatId == this.chatRoomId && this.senderId != data.senderId) {
        return this.isTyping = true;
      }
    });

    this.socket.on('stop typing', (data: any): any => {
      if (data.chatId == this.chatRoomId && this.senderId != data.senderId) {
        return this.isTyping = false;
      }
    })

  }

  ngOnInit() {
    this.userService.loadChatmates().subscribe((res) => {
      this.chatRooms = res.chatroomToDisplay
      this.userId = res.userId

    })
  }
  sendMessage(text: string) {
    const data = {
      senderId: this.userId,
      recieverId: this.recieverId,
      content: text,
      chatRoomId: this.chatRoomId,
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
  openChatroom(recieverId: string, senderid: string, name: string, chatRoomId: string) {
    if (recieverId == this.userId) {
      this.recieverId == senderid
    } else {
      this.recieverId == recieverId
    }
    this.openRoom = true
    this.recieverName = name
    this.senderId = this.userId
    this.recieverId = recieverId
    this.chatRoomId = chatRoomId

    this.userService.loadChats(senderid, recieverId).subscribe((res) => {
      this.chats = res.chats
    })
    this.friendList = false
    this.chatList = true

  }
  typingHandler(e: Event) {
    const data = {
      senderId: this.userId,
      recieverId: this.recieverId,
      chatId: this.chatRoomId, // Assuming _id is the chat ID
    };

    this.socket.emit('typing', data);

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength) {
        this.socket.emit("stop typing", data);
      }
    }, timerLength);
  };
}
