export const openNotificationWithIcon = (type, api, mess, desc) => {
  api[type]({
    // message: mess,
    description: desc,
  });
};
