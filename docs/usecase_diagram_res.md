```plantuml
@startuml usecase
left to right direction

actor Restaurator as Res
actor Administrator as Ad

usecase "Logowanie do aplikacji" as uc1
usecase "Edycja Menu" as uc2
usecase "Wybór dostawcy" as uc3
usecase "Rejestrowanie restauracji" as uc4
usecase "Zmiana kosztów dostawy" as uc5
usecase "Przyjmowanie zamówienia" as uc6

Ad --> uc4
Ad --> uc2
Ad --> uc1
(uc6) ..> (uc3) : include
Res --> uc1
Res --> uc6
Res --> uc5

@enduml
```