# E-pood – Frontend ja Backend

Selles projektis on loodud lihtne e-pood JavaScripti ja Node.js abil. Projekt koosneb frontendist ja backendist ning töötab ühe lehe rakendusena ilma lehe värskendamiseta.

Projektis on teostatud toodete kuvamine, detailvaade, ostukorv koos koguste muutmisega, 24% käibemaksu arvestus, lemmikute süsteem, toast-teavitused ning andmete salvestamine. Ostukorv ja kasutaja ID salvestatakse LocalStorage’i ning lemmikud salvestatakse backendis faili.

Backend on tehtud Expressiga ning pakub GET, POST ja DELETE API-sid toodete ja lemmikute haldamiseks.

Projekt on arendatud Node.js versiooniga v24.9.0.

Projekti käivitamiseks tuleb esmalt käivitada backend:

cd backend  
npm install  
node server.js

Server töötab aadressil http://localhost:3000

Seejärel tuleb avada frontend, käivitades index.html Live Serveriga või brauseris.

Veebilehel saab vaadata tooteid, lisada neid ostukorvi, hallata lemmikuid ning kinnitada kasutaja tellimus. Kõik hinnad sisaldavad 24% käibemaksu.
