// Pobierz wszystkie trzy przyciski
const buttons = document.querySelectorAll('.toggle-button');

// Przypisz event dla każdego przycisku
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    // Najpierw odciśnij wszystkie przyciski
    buttons.forEach((btn) => {
      btn.classList.remove('pressed');
    });

    // Następnie dodaj klasę 'pressed' do aktualnie klikniętego przycisku
    this.classList.add('pressed');
  });
});
