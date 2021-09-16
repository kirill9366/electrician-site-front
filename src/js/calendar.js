let getDaysOfMonth = (year, month) => {
  let date = new Date(year, month, 1, 10);
  let current_month = new Date(year, month, 1, 10).getMonth();
  let day = date.getDay();
  if (day === 0) {
    day = 7
  } else if (day === 7) {
    day = 0
  }

  date.setDate(1 - day);

  let days = new Array();
  for (let i = 0; i < 35; i++) {

    date.setDate(date.getDate() + 1);
    if (current_month !== date.getMonth()) {
      days.push({
        num: date.getDate(),
        type: 'deactive'
      });
    } else {
      days.push({
        num: date.getDate(),
      });
    };

  };

  return days
};

let drawDaysCalendar = (calendar_el, days) => {
  let calendarHTML = '';
  for (let day of days) {
    switch (day.type) {
      case 'active':
        calendarHTML += `<div class="calendar_card calendar_card_active">${day.num}`;
        calendarHTML += `<span class="calendar_card__desc">${day.desc}</span>`;
        calendarHTML += '</div>';
        calendar_el.innerHTML = calendarHTML;
        break;
      case 'deactive':
        calendarHTML += `<div class="calendar_card calendar_card_deactive">${day.num}</div>`;
        calendar_el.innerHTML = calendarHTML;
        break;
      default:
        calendarHTML += `<div class="calendar_card calendar_card">${day.num}</div>`;
        calendar_el.innerHTML = calendarHTML;
        break;
    };
  };
};

let drawMonthAndYear = (element, month, year) => {
  let months = new Array(
    "Январь","Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь",
  );
  element.innerHTML = `${months[month]}, ${year}`;
};

let drawCalendar = (currentDate) => {
  let days = getDaysOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  let monthsAndYear = document.querySelector('#month_title');
  drawMonthAndYear(monthsAndYear, currentDate.getMonth(), currentDate.getFullYear());
  drawDaysCalendar(calendar, days);
};

let today = new Date();

let calendar = document.querySelector('#calendar');
if (calendar) {
  drawCalendar(today);

  let calendarLeft = document.querySelector('#calendar_left');
  calendarLeft.addEventListener('click', (event) => {
    today.setMonth(today.getMonth() - 1);
    drawCalendar(today);
  })
  let calendarRight = document.querySelector('#calendar_right');
  calendarRight.addEventListener('click', (event) => {
    today.setMonth(today.getMonth() + 1);
    drawCalendar(today);
  })
};
