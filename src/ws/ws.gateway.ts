import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import * as uuid from 'uuid';

import { WsSocket } from './ws-socket';


@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {


  connectedClients: WsSocket[] = [];

  async broadcast(payload: string) {

    await Promise.all(this.connectedClients.map((ws) =>
      new Promise<void>(
        (resolve) => ws.send(payload, () => resolve())
      )
    ));

  }

  async handleConnection(client: WsSocket, req: Request) {

    client.id = uuid.v4();

    this.connectedClients.push(client);

    Logger.verbose(`Client connected ${client.id}. Total clients: ${this.connectedClients.length}`, WsGateway.name);

  }

  async handleDisconnect(client: WsSocket) {

    this.connectedClients.splice(this.connectedClients.indexOf(client));

    Logger.verbose(`Client disconnected ${client.id}. Total clients: ${this.connectedClients.length}`, WsGateway.name);

  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() { type, payload }: { type?: string, payload?: any } = {}, @ConnectedSocket() ws: WsSocket) {
    Logger.verbose(`WS -> Type:'${type}' | Payload:'${JSON.stringify(payload)}'`, WsGateway.name);
  }

}
