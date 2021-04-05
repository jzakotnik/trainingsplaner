# Trainingsplaner app

Für die Planung der Trainingszeiten in Vereinen (z.B. Tennisverein) ist es meist ein tagelanger Aufwand, die Anmeldungen der Mitgliederinnen und Mitglieder auszuwerten und auf die möglichen Trainingszeiten zu mappen. Ein voll-automatisiertes System ist meist nicht möglich, da es viele softe Constraints gibt ("ich habe schon immer Donnerstag Abend gespielt und zwar mit meiner Schwester). 

Um die Planung zu vereinfachen gibt es folgende digitalisierte Strecke.

## Eingabe der Daten via Google Forms

Die Daten werden via google Forms eingegeben. Ein Hauptproblem ist, dass die Zeiten oft ein Grid sind, d.h. mögliche Tage auf der X-Achse und Zeiten auf der Y-Achse. In dem Excel Export ist aber jede Anmeldung eine Zeile, das heisst das Grid wird in recht viele unübersichtliche Spalten eingefügt. 

![image](https://user-images.githubusercontent.com/551599/113604996-57cf1b80-9646-11eb-892b-669fd29618fc.png)


## Auswertung über eine statische React App

Dieses Repository nutzt eine statische Webseite, welche das Excel laden kann und in für die Planung nützlichen Darstellungsformen darstellen kann. Dabei werden keine Daten auf einen Server geladen, sondern die Darstellung passiert komplett offline im Browser: https://jzakotnik.github.io/trainingsplaner/

