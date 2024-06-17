import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}
  handleConnection(client: any, ...args: any[]) {
    // Logic to handle socket connection
  }

  handleDisconnect(client: any) {
    // Logic to handle socket disconnection
  }

//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any) {
//     // Logic to handle incoming message event
//   }
  @SubscribeMessage('chatMessage')

  
  async handleChatMessage(client: any, message: string) {
    console.log("in ggggggg chat");
    await this.chatService.create(message);
    // Additional logic if needed
  }
}