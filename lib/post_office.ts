import {Message} from "./message";

export interface PostOffice {
    send(message: Message): void
}