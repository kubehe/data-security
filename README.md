
# Ochrona danych aplikacja

## Przykładowa aplikacja

Przykładowa aplikacja wystawiona jest pod tym urlem: `!todo`

## Sposób instalacji

Do instalacji wymagany jest docker i docker-compose.

Na ubuntu >= 16.04 można te zależności zainstalować poniższym skryptem odpalonym w sudo:

``` bash
#!/usr/bin/env bash

snap install -y docker

groupadd docker # te 3 linie pozwalaja na wykonanie dockera bez sudo - wymaga zrestartowania sesji użytkownika
usermod -aG docker $USER
newgrp docker

apt install -y docker-compose
```

Komenda do instalacji: `cd <lokalizacja projektu apache-express> && docker-compose -f docker-compose.yml up -d`

Aplikacja zostanie zainstalowana i wystawiona na `http://localhost` - jeżeli jakaś aplikacja korzysta z portu 80 to nie zadziała.

## Wykorzystane algorytmy

Do szyfrowania haseł zastosowałem algorytm bcrypt.

## Wykorzystane technologie

### Docker

Docker wykorzystałem z kilku powodów.

Najważniejszą zalętą dockera dla mnie jest automatyzacja procesu uruchamiania aplikacji.
W tym celu użyty jest `docker-compose.yml`.
Komenda `depends_on` powoduje uruchamianie kontenerów w odpowiedniej kolejnośći, w moim projekcie najpierw postawiona jest baza danych (`database`), potem serwer aplikacji (`app`), a na koniec apache (`apache`).

Kolejną zaletą jest odseparowana sieć wewnętrzna - baza danych Postgresql i serwer aplikacji nie jest widoczny w interfejsie loopback serwera - docker tworzy bridge który umożliwia tylko komunikację dla portów kontenerów które mapuje się w docker-compose - notacja `<port-hosta>:<port-kontenera>`

Taka architektura zapewnia mniejszą powierzchnię ataku - wystarczy tylko zabezpieczyć maszynę na której odpalany jest docker, w przeciwieństwie do alternatywy jaką jest stawianie x maszyn wirtualnych na jednym serwerze.

### Apache

Służy w mojej aplikacji jako reverse-proxy dla serwera aplikacyjnego.

### Node

Jako serwer aplikacji wykorzystałem Nodejs

### Postgresql

Jako bazę danych wykorzystałem postgresql.