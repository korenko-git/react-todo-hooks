/* eslint-disable no-param-reassign */
const mockDate = '2020-08-17T11:01:58.135Z';
global.Date = class extends Date {
  constructor(year, month, day, hour, minute, second, millisecond) {
    switch (arguments.length) {
      case 0:
        super(mockDate);
        break;

      case 1:
        if (year) super(year);
        else super(mockDate);
        break;

      default:
        day = typeof day === 'undefined' ? 1 : day;
        hour = hour || 0;
        minute = minute || 0;
        second = second || 0;
        millisecond = millisecond || 0;
        super(year, month, day, hour, minute, second, millisecond);
        break;
    }
  }

  static now() {
    return 1597662118135; // 2020-08-17T11:01:58.135Z
  }
};
