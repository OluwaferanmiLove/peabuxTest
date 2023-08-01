import * as Notifications from 'expo-notifications';

const useNotification = () => {
  const schedulePushNotification = async (
    notificationData: {},
    title: string,
    description: string,
    // time: Date,
    // interval: number,
    trigger: Notifications.NotificationTriggerInput,
    // day:
    //   | 'Sunday'
    //   | 'Monday'
    //   | 'Tuesday'
    //   | 'Wednesday'
    //   | 'Thursday'
    //   | 'Friday'
    //   | 'Saturday',
  ) => {
    // time = new Date(time.getTime() - 5 * 60000);
    // let days = [
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    // ];
    // const weekday = days.indexOf(day) + 1;
    // const hours = time.getHours();
    // const minutes = time.getMinutes();
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: description,
        data: notificationData,
        // sound: 'default',
      },
      trigger,
      // trigger: {
      //   weekday: weekday,
      //   hour: hours,
      //   minute: minutes,
      //   repeats: true,
      // },
    });
    console.log('notif id on scheduling', id);
    return id;
  };

  const cancelPushNotification = async (notifId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notifId);
  };

  return {
    schedulePushNotification,
    cancelPushNotification,
  };
};

export default useNotification;
