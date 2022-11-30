import type { NotificationModel } from "@/models/Notification.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuid } from "uuid";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<NotificationModel[]>([]);

  function addNotification(message: string, body = "") {
    const id = uuid();

    const timeoutRef = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    // Schedule notification remove
    const notification: NotificationModel = {
      id,
      message,
      body,
      timeoutRef,
    };
    notifications.value.push(notification);
  }

  function removeNotification(id: string) {
    const notification =
      notifications.value[notifications.value.findIndex((n) => n.id === id)];
    clearTimeout(notification.timeoutRef);

    notifications.value.splice(
      notifications.value.findIndex((n) => n.id === id),
      1
    );
  }

  return { notifications, addNotification, removeNotification };
});
