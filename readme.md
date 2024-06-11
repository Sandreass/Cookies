# BE - Sicherheit - 07: Cookies

- Cookies!

## Theorie: Cookies

- Lecker!
- Wer von euch hat schon von Cookies gehört?
- Bevor wir anfangen, welche Art von Informationen werden in einer HTTP-Anfrage übertragen?
    - Methode, URL
    - Header
    - Body / Nutzlast

- Und in einer Antwort?
    - HTTP-Antwortcode
    - Header
    - Body / Nutzlast

- Cookies sind kleine Datenstücke, die in den Headern übertragen werden
    - Üblicherweise sendet der Server Cookies an den Client
    - Der Client speichert dann diese Cookies

- Ein Cookie-Header enthält einen Namen und einen Wert sowie einige Metadaten
- Ein Cookie-Header kann so aussehen:

    - `Set-Cookie: sessionId=abc123; Expires=Wed, 31 Oct 2028 13:37:00 GMT; Secure; HttpOnly`

        - `sessionId` ist der Name des Cookies
        - `abc123` ist der Wert des Cookies
        - `Expires=Wed, 31 Oct 2028 13:37:00 GMT` setzt das Ablaufdatum
            - Danach wird das Cookie vom Browser gelöscht
        - `Secure` und `HttpOnly` definieren, welche Art von Cookie dies ist

- Dieses Cookie wird im Browser gespeichert und bei jeder Anfrage an den Server gesendet

- Wir haben dort zwei verschiedene Arten von Cookies erstellt
    - Eine Art von Cookie war `Secure` und `HttpOnly`
    - Die andere war nicht; nur ein einfaches Cookie

- `Secure` Cookies werden nur über HTTPS gesendet
    - Der Browser akzeptiert das Cookie
    - Der Browser speichert das Cookie
    - Der Browser sendet das Cookie nur über HTTPS-Verbindungen zurück
    - Allerdings machen die Browser eine Ausnahme für localhost
    - Dies liegt daran, dass localhost in der Regel für die Entwicklung verwendet wird
    - Es ist oft nicht praktisch, HTTPS für die lokale Entwicklung einzurichten

- Auf `HttpOnly` Cookies kann nicht von JS im Browser zugegriffen werden
    - Dies erhöht die Sicherheit
    - Stelle dir einen XSS-Angriff vor
        - Wenn mein GitHub-Profil etwas JavaScript hätte, das deine GH-Cookies liest
        - Und sie dann an mich sendet, wenn du mein Profil besuchst
        - Ich könnte dich imitieren oder zumindest einige möglicherweise private Daten lesen
    - Halte deine Cookies sicher! JavaScript sollte _nicht_ darauf zugreifen können!

- Cookies werden immer nach Herkunft getrennt
    - Cookies, die von `https://github.com/` gespeichert wurden, werden für diese Herkunft gespeichert
    - Cookies, die von `http://example.org:3000/` gespeichert wurden, werden für diese Herkunft gespeichert
    - Seiten sollten niemals deine Cookies von anderen Seiten sehen!

## Theorie: Sitzungen

- Welche Art von Daten wird also in Cookies gespeichert?
- EINE MENGE, tatsächlich
    - Bevorzugt dieser Benutzer den Dunkelmodus?
    - Was ist die Zeitzone dieses Benutzers?
    - Usw. usw.

- Aber der typische Anwendungsfall ist eine `session` ID
- Sitzungen sind interessant und nützlich

- Sitzungen sind eine Möglichkeit, Benutzeranmeldungen durchzuführen
    - Wenn Gary erfolgreich `POST /login` macht, erstellst du eine zufällige ID
    - Du speicherst diese ID zusammen mit dem Benutzernamen in irgendeiner Art von Speicher
    - Dann sendest du diese ID als Cookie `session=99152`
    - Jedes Mal, wenn eine Anfrage mit `session=99152` kommt, weißt du, OH das ist Gary!

- Aber du könntest auch anonyme Sitzungen haben
    - Du könntest zum Beispiel alle Anfragen von einer einzigen Quelle erkennen
    - Und Statistiken erstellen
    - Das erste Mal, wenn eine Person deine Seite öffnet, setzt du `session=52`
    - Wenn der Benutzer zu einer anderen Seite geht, erhältst du `session=52` in der Anfrage
    - So kannst du Tracking erstellen
        - Session 52 besuchte: Home, Produkte, Kontakt und schließlich Galerie
        - Session 41 besuchte: Werbelink, Karriere und schließlich Galerie

-  Besuche eine Seite wie https://github.com/ in **Inkognito**
    - Zeige Cookies, sollte `_gh_sess` und `preferred_color_mode` haben

## Tracking-Cookies

- Stell dir vor, du besuchst einen Online-Buchladen, um nach einem Buch über Gartenarbeit zu suchen. Wenn du die Website betrittst, platziert sie einen Tracking-Cookie auf deinem Computer. Dieser Cookie behält still im Hintergrund bei, dass du an Büchern über Gartenarbeit interessiert warst.
  

- Später, während du andere Websites durchstöberst, könntest du bemerken, dass Anzeigen für Gartengeräte oder Pflanzen auftauchen. Diese Anzeigen scheinen dir im Internet zu folgen und erscheinen auf Social-Media-Plattformen, Nachrichten-Websites oder sogar beim Anschauen von Videos online.

- Diese Anzeigen werden durch den Tracking-Cookie des Buchladens ermöglicht. Er ist wie ein kleiner Pfadfinder, der anderen Websites zuflüstert: "Hey, diese Person interessiert sich für Gartenarbeit!" Daher zeigen dir diese anderen Websites Anzeigen, die mit Gartenarbeit zusammenhängen, weil sie wissen, dass es etwas ist, für das du dich interessierst, dank dieses Tracking-Cookies.

- Im Wesentlichen helfen Tracking-Cookies Websites dabei, deine Interessen zu verfolgen und Werbung entsprechend deiner Vorlieben anzupassen, während du im Internet surfst.
  
  
## Zusammenfassung

- Cooooookies!
- Lecker?
- Wird oft bei der Authentifizierung auf Basis von Sitzungen verwendet
- Kann auch mit JWTs verwendet werden
- Wird für das Tracking verwendet
- Der Browser sendet Cookies automatisch mit Anfragen

