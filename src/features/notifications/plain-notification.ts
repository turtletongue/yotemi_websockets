import { Id } from '@app/app.declarations';

export default interface PlainNotification {
  id: Id;
  type: 'interviewStarted' | 'interviewScheduled' | 'newFollower';
  content: Record<string, unknown> | null;
  isSeen: boolean;
  userId: Id;
  createdAt: Date;
  updatedAt: Date;
}
