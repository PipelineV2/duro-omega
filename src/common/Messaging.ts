// src/common/Messaging.ts
import twilio from "twilio";
import { Request } from "express";

export interface Message {
  to: string;
  body: string;
}

class Messaging {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  private async sendMessage(message: Message): Promise<void> {
    await this.client.messages.create({
      body: message.body,
      from: process.env.SENDER_PHONE_NUMBER,
      to: message.to,
    });
  }

  public async sendSms(to: string, body: string): Promise<void> {
    const message: Message = { to, body };
    await this.sendMessage(message);
  }

  public async sendSmsToRequester(request: Request, body: string): Promise<void> {
    const { phoneNumber } = request.body;
    await this.sendSms(phoneNumber, body);
  }
}

export default Messaging;
