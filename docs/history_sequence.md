```plantuml
@startuml history
actor Użytkownik as user
participant "OrderComponent" as front
participant "OrdersList" as api
participant "Baza danych" as db


user -> front : wybiera opcję do wyświetlania historii zamówień
front -> api : wysyła zapytanie o historię zamówień
api -> db : pobiera listę zamówień
db -> api : zwraca listę zamówień użytkownika
alt brak historii zamówień
    db -> api : wysyła pustą odpowiedź
    front <- api : wysyła pusty obiekt zamówień
    user <- front : komunikat: brak zamówień w historii
end
front <- api : wysyła historię zamówień
user <- front : wyświetla historię zamówień
@enduml
```