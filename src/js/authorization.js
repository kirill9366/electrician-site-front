let buttons = document.getElementsByClassName('authorization__input_icon');
for (let button of buttons) {
  button.addEventListener('click', (event) => {
    event.target.classList.toggle('fa-eye-slash');
    let input = document.getElementById(event.target.getAttribute('id'));
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    };
  });
};