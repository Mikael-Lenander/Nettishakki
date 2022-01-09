# Nettishakki

Sivu löytyy [täältä](https://nettishakki.netlify.app/).

Peliä voi kokeilla nopeasti avaamalla sivu kahdelle välilehdelle. Painamalla Create new game-nappia näytölle ilmesyy koodi, jonka voi syöttää toisella välilehdellä painamalla ensin "Join game". Peliä voi toki pelata myös kaveria vastaan. Sivu näyttää parhaalta Chromella, eikä siitä ole puhelinversiota.

## Käytetyt teknologiat ja rakenne

- frontend: React, Redux, React Konva (grafiikoihin)
- backend: Socket.io

Koko projekti on kirjoitettu Typescriptillä. Shakin pelilogiikka ja osa tyypeistä on sijoitettu shared-kansioon, koska sekä frontend että backend tarvistevat niitä. 

## Pelistä

Peli on täysin toiminnallinen toteutus shakista lukuunottamatta seuraavia sääntöjä:
- sotilas korotetaan automaattisesti kuningattareksi
- tasapeli tulee ainoastaan patissa ja yleisimmissä riittämätön materiaali-tilanteissa
- pelaaja ei voi ehdottaa tasapeliä eikä luovuttaa (paitsi disconnectaamalla).

Jos pelaaja disconnectaa, hänellä on 10 sekuntia aikaa palata peliin, tai muuten vastustaja jaa luovutusvoiton. Tosin jos selaimen sulkee, ei peliin pääse enää takasin, koska vieraskäyttäjä on tallennettu session storageen.