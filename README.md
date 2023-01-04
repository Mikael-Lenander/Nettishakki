# Nettishakki

Fullstackopen-harjoitustyö 175 h

Sivu löytyy [täältä](https://nettishakki.herokuapp.com/).

[työaikakirjanpito](docs/tuntikirjanpito.md)

## Ohjeet

Peliä voi kokeilla nopeasti avaamalla sivu kahdelle välilehdelle. Painamalla Create new game-nappia näytölle ilmesyy koodi, jonka voi syöttää toisella välilehdellä painamalla ensin "Join game". Peliä voi toki pelata myös kaveria vastaan.

Kirjautuneelle käyttäjälle pelatut pelit ilmestyvät etusivulle. Pelin siirtoja voi selata valitsemalla ensin pelin ja sitten painamalla näytölle ilmestyvää lautaa. Esim. käyttäjällä demouser salasanalla vahvasalasana on kaksi peliä, joita voi tarkastella.

Sivu toimii ainakin Chromella ja Firefoxilla. Sivu ei toimi mobiililaitteilla.

## Käytetyt teknologiat ja rakenne

- frontend: React, Redux
- backend: Socket.io, Express, PostgreSQL

Koko projekti on kirjoitettu TypeScriptilla. Shakin pelilogiikka ja osa tyypeistä on sijoitettu shared-kansioon, koska sekä frontend että backend käyttävät niitä.

## Pelistä

Peli on täysin toiminnallinen toteutus shakista lukuunottamatta seuraavia sääntöjä:
- sotilas korotetaan automaattisesti kuningattareksi
- tasapeli tulee ainoastaan patissa ja yleisimmissä riittämätön materiaali-tilanteissa

Tärkeimmät ominaisuudet:
- peliä pelataan moninpelinä ihmisvastustajaa vastaan
- pelissä on mahdollista pelata eri aikakontrolleilla sekä voi luovuttaa ja ehdottaa tasapeliä
- sisäänkirjautuneelle käyttäjälle peli tallentuu tietokantaan, joten pelaaja voi tarkastella omia pelejään myöhemmin