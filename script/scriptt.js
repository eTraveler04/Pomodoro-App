// Pobranie elementów popupu
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupOverlay = document.getElementById('popupOverlay');

// Funkcja do otwierania popupu
openPopupBtn.addEventListener('click', function() {
  popupOverlay.style.display = 'flex'; // Wyświetla popup
});

// Funkcja do zamykania popupu
closePopupBtn.addEventListener('click', function() {
  popupOverlay.style.display = 'none'; // Ukrywa popup
});

// Zamknięcie popupu, gdy użytkownik kliknie w dowolne miejsce poza nim
window.addEventListener('click', function(event) {
  if (event.target === popupOverlay) {
    popupOverlay.style.display = 'none'; // Ukrywa popup
  }
});
