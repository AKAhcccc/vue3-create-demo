// 封装一个函数，获取一个结果： 是早上还是下午，又或者晚上？
export const getTime = () => {
  let message = '';
  const hours = new Date().getHours();

  switch (true) {
    case (hours <= 9):
      message = '早上';
      break;

    case (hours <= 12):
      message = '上午';
      break;

    case (hours >= 12 && hours <= 14):
      message = '中午';
      break;

    case (hours <= 18):
      message = '下午';
      break;

    default:
      message = '晚上';
      break;
  }

  return message;
};
