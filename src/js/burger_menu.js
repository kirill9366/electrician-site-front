let burgerButton = document.getElementsByClassName('burger_menu')[0];
burgerButton.addEventListener('click', (event) => {
    let headerList = document.getElementsByClassName('header__list')[0];
    let auth = document.getElementsByClassName('auth')[0];
    headerList.classList.toggle('header__active_burger');
    auth.classList.toggle('header__active_burger'); 
});