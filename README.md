# food-ordering-and-delivering-service
### Glove
Application for managing ordering and delivering food from restaurants built with React and Django


### Co robi aplikacja?
### User:
* otwiera aplikacje
* ekran logowania się do aplikacji (autoryzacja Sign Up with Apple i Google)
* wyświetlenie listy restauracji na zasadzie geolokalizacji (wpisanie adresu)
* wybranie restauracji, wyświetla się lista dań
* wybranie i konfiguracja dania 
* koszyk, do którego dodajemy dania = zamówienie
* płatność/zamów zakończenie transakcji (gotówka, ew. waluta wewnętrzna przypisana do konta) 
* graficzny wskaźnik statusu zamówienia (dopóki restauracja nie zaakceptuje zamówienia)
* no i sobie zjesz dobre jedzonko
* ekran oceny zamówienia
* dostanie powiadomienia o potwierdzone/odrzucone zamówienie


### Restauracja:
#### Obsługa zamówień
* przyjmuje albo odrzuca zamówienie
* wybór dostawcy
* przy braku dostawców przez jakiś czas, anuluje zamówienie
* po odebraniu zamówienia przez dostawcę, jest ono odznaczane jako wydane

#### Edytowanie menu
* dodawanie dań
* edytowanie dań (cena, warianty, zdjęcie poglądowe(?))
* usuwanie dań

#### Edytowanie restauracji
* zmiana lokalizacji
* zmiana szczegółów o restauracji


### Administrator systemu:
#### Dodawanie/usuwanie restauracji
* generowanie konta restauracji (typ użytkownika systemu)
* usuwanie resturacji


### Dostawca (to be confirmed)
* Daje sygnał o dostępności
* Uruchamiana jest jego geolokalizacja
* Dostaje powiadomienia od restauracji o dostępnym zamówieniu
* Odbiera zamówienie i dostarcza je klientowi
* Dostawca może przeglądać swoją historię dostaw


# Założenie projektu
Stworzenie systemu obsługującego zamawanie posiłków z restauracji z wieloma endpointami.
### Wymagania funkcjonalne:
* Założenie konta
* Logowanie
#### Użytkownik:
* Sprawdzenie historii zamówień
* Złożenie zamówienia
* Sprawdzenie listy restauracji w okolicy oraz informacji o nich
#### Dostawca:
* Otrzymuje informacje z restauracji o zamówieniu do odebrania
* Otrzymuje trasę do restauracji oraz od restauracji do klienta
#### Restaurator:
* Przyjmowanie zamówień do realizacji
* Odrzucanie zamówień
#### Administrator:
* Dodawanie restauracji
* Dodawanie i edytowanie dań oraz menu restauracji
* Zmiana uprawnień użytkowników(?)
* Tworzenie kont restauracji


### Wymagania niefunkcjonalne:
* Backend stworzony jako REST API z pomocą frameworku Django
* Baza danych w PostgreSQL
* Frontend jako aplikacja mobilna napisana w React Native z Expo
* Autoryzacja i uwierzytalnie za pomocą JWT tokenów oraz Google i Apple
* Aplikacja mobilna przeznaczona dla normalnych klientów, restauratorów oraz dostawców
* Menu administratora jako strona internetowa
* Telefon: Android min. Android 6, iOS min. 10
