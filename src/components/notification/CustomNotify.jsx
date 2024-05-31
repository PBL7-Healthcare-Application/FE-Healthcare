export const openNotificationWithIcon = (type, api, mess, desc) => {
  api[type]({
    // message: mess,
    description: <span style={{ marginTop: 20 }}>{desc}</span>,
  });
};
