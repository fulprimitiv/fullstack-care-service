export type HelpRequestStatus = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

export type HelpRequestType =
   | 'SHOPPING'
   | 'CLEANING'
   | 'PHARMACY'
   | 'COMMUNICATION'
   | 'WALK'
   | 'REPAIR';

export type UserRole = 'VOLUNTEER' | 'RECIPIENT';
