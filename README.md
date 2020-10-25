[![Build Status](https://scrutinizer-ci.com/g/heidipatja/js-project-frontend/badges/build.png?b=main)](https://scrutinizer-ci.com/g/heidipatja/js-project-frontend/build-status/main)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/heidipatja/js-project-frontend/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/heidipatja/js-project-frontend/?branch=main)

## Available Scripts

### `npm install`

Installs all dependencies.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `npm test`

Runs Selenium tests.


## Redovisning krav 2: Frontend

Klienten är skapad med React, som är ramverket jag har jobbat med under kursen. Arbetssättet har varit lite utforskande och i början av kursen arbetade jag med komponentklasser, men mot slutet provade jag att jobba med funktionella komponenter och dela upp sidorna i flera mindre delar. Det kändes smidigt, eftersom det ger bra koduppdelning och gör att man kan återanvända komponenter.

När man är inloggad kan man se och uppdatera sitt saldo samt köpa och sälja valuta. För att hantera inloggning och se till att man endast når vissa sidor via login används JSON Web Tokens i kombination med React Router och Redirect. Eftersom JWT löper ut automatiskt och backend alltid måste signera dem ökar säkerheten och det känns därför som en bra lösning. Jag upplever att det fungerar bra för API-anropen, men en vidareutveckling skulle kunna vara att ta fram en lösning som gör att man inte blir utloggad vid sidomladdningar.

För att ta emot data i realtid används socket.io-client. Serverbitarna beskrivs närmare i [GitHub-repot för socket servern](https://github.com/heidipatja/js-project-socket). Realtidsinformationen visas upp i en graf, samt i tabellform tillsammans med användardata och knappar för köp och sälj. Informationen är samlad på samma sida för att kunna bevaka utvecklingen och ta snabba beslut. Grafen är skapad med Chart.js och react-chartjs-2. React-chart-2 förenklar användningen av Chart.js tillsammans med React, vilket var en av anledningarna till att jag valde denna kombination. Det var också en väldokumenterad lösning och det fanns gott om möjligheter att anpassa grafen enligt sina egna behov. Den inbyggda responsiviteten är ett plus.

För en trevligare användarupplevelse används ikoner från FontAwesome/react-fontawesome i menyn och på trading-sidan. Klienten är responsiv.

## Redovisning krav 5: Tester frontend

Jag har skapat fem use cases, som testas med Mocha och Selenium. Eftersom man kan köra med en headless browser fungerar det bra för denna typ av tester. Testerna fokuserar på den funktionalitet som ligger bakom login. För att förenkla login-proceduren har jag lagt de stegen i en egen funktion. Loginuppgifterna som används tillhör användaren som skapas genom node /db/reset.js i backend, så den måste vara igång för att testerna ska gå igenom. Jag har utvecklat mina tester sedan kursmoment 4 och har t.ex. lagt till användning av sendKeys() för att kunna testa funktionalitet som kräver input från användare, som inloggning eller uppdatering av saldot.

För att köra testerna, använd **npm test**. Det går även att validera koden med **npm run eslint**.

### Use cases

Man ska kunna...

1. Fylla i loginformuläret > klicka på knappen > hamna på account-sidan

3. Logga in > se menyalternativen trade och account

3. Logga in > navigera till trade > se graf (canvas-tagg)

4. Logga in > se logout-länk > klicka på logout > se login-länk

5. Logga in > se saldot > sätta in pengar > se att saldot är förändrat
