import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3001
app.use(cors())
app.use(cookieParser())

app.get('/cookie', (req, res) => {
    // Setzen eines benutzerdefinierten Cookies mit spezifischen Attributen
    res.header('Set-Cookie', 'sessionId=abc123; Expires=Wed, 31 Oct 2024 13:37:00 GMT; Secure; HttpOnly')
    // Senden des Werts des Cookies zurück an den Client
    res.send(req.cookies.sessionId)
})

app.get('/easycookie', (req, res) => {
    // Setzen eines Cookies, das in 15 Minuten abläuft, mit den Attributen Secure und HttpOnly
    const options = { expires: new Date(Date.now() + 900000), secure: true, httpOnly: true }
    res.cookie('otherSessionId', 'xyz987', options)
    // Senden des Ablaufdatums zurück an den Client
    res.send({ date: new Date(Date.now() + 900000) })
})

app.get('/lamecookie', (req, res) => {
    // Setzen eines Cookies, das in 1 Minute abläuft
    res.cookie('lamecookie', 'bad', { expires: new Date(Date.now() + 60000) })
    // Senden einer Antwort zur Bestätigung, dass das Cookie gesetzt wurde
    res.send('Cookie wurde mit der anderen Methode gesetzt!')
})

app.get('/lamecookie', (req, res) => {
    // Berechnen des Ablaufdatums in 1 Tag
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + oneDayInMillis);
    // Setzen eines Cookies, das in 1 Tag abläuft
    res.cookie('lamecookie', 'bad', { expires: expirationDate });
    // Senden einer Antwort zur Bestätigung, dass das Cookie gesetzt wurde
    res.send('Cookie wurde mit der anderen Methode gesetzt!');
});

app.get('/getcookies', (req, res) => {
    // Abrufen des Werts des lamecookie-Cookies
    const otherSessionId = req.cookies.lamecookie;
    // Senden des abgerufenen Cookie-Werts zurück an den Client
    res.send({ otherSessionId });
});








app.listen(port, () => console.log(`Server läuft unter http://localhost:${port}`))