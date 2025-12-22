import type { HelpRequestStatus, HelpRequestType } from './enums';

export interface HelpRequest {
   id: number;
   type: HelpRequestType;
   description: string;
   address: string;
   requestDate: string;
   recipientId: number;
   volunteerId?: number;
   status: HelpRequestStatus;
   rating?: number;
   comment?: string;
}

export interface CreateHelpRequestCommand {
   type: HelpRequestType;
   description: string;
   address: string;
   requestDate: string;
   recipientId: number | undefined;
}
