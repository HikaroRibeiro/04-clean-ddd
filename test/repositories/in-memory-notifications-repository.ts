import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notifications'

export class InMemoryNotificationsRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
