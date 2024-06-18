// Nutze express, um einen Server zu erstellen
const express = require('express');
// Nutze morgan, um Requests zu loggen (Middleware)
const morgan = require('morgan');

// Erstelle eine Express-App
const app = express();
// Definiere den Port, auf dem der Server laufen soll
const PORT = process.env.PORT || 3000;

// Die Morgan-Middleware wird verwendet, um detaillierte Logs jeder Anfrage zu erstellen.
// Die Option 'combined' erstellt ein Standard-Log-Format. Also detaillierte Logs erzeugt, inklusive IP-Adresse, Timestamp, HTTP-Methode, URL, Statuscode und mehr.
app.use(morgan('combined'));

// Middleware zum Parsen von JSON-Daten 
// Diese Middleware ermöglicht es der App, JSON-Daten im Anfragekörper zu parsen.
app.use(express.json());

// Routen
// Diese Routen behandeln GET-, POST-, PUT- und DELETE-Anfragen an / und /data.
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.get('/data', (req, res) => {
  res.json({ message: 'GET request to /data' });
});

app.post('/data', (req, res) => {
  res.json({ message: 'POST request to /data', data: req.body });
});

app.put('/data', (req, res) => {
  res.json({ message: 'PUT request to /data', data: req.body });
});

app.delete('/data', (req, res) => {
  res.json({ message: 'DELETE request to /data' });
});

// Middleware zur Behandlung von 404-Fehlern
// Diese Middleware behandelt Anfragen an nicht definierte Routen und sendet eine 404-Fehlerantwort.
// Achtung: Speziellere Fehlerbehandlungen wie diese sollten immer am Ende der Middleware-Kette stehen, damit sie nur auf Anfragen angewendet werden, die nicht von anderen Routen oder Middleware behandelt wurden.
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
  });
  

// Zentrale Fehlerbehandlungs-Middleware
// Diese Middleware fängt alle Fehler ab, die während der Verarbeitung einer Anfrage auftreten, und sendet eine einheitliche Fehlermeldung.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Starte den Server und höre auf dem definierten Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});