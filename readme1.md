projektet startas med: npm run dev

seed fil finns inte tillgänglig, hann inte skapa en

-   Motivera ditt val av databas
    mitt val för databas (mongodb + mongoose) var för att jag bestämde mig för att använda NoSql pga jag ville helst fortsätta bygga kunskap med den typen ad db språk, samt för att jag tyckte att det är mer flexiblet med denna typ av uppgifter och data

-   Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen

-   i denna uppgift är det en REST api som hanterar koplingen mellan backend och servern

-   verktyg
    bcrypt: för att kryptera lösenord när man skapar en user eller ändrar lösenordet på en existerande user, så att lösenordet inte sparas i text i databasen.

    env: för att spara viktiga nycklar eller url så att dom inte blir synliga för andra när man laddar upp koden till github

    typescript: för att definera alla data typer som man ger som input eller som funktioner returnerar, etc.

    express: lättare sätt skapa en server med node.

    mongoose: för att definera hur data skickas in till mongo databasen.

-   Redogör översiktligt hur applikationen fungerar

    Projektet är updelat i olika mappar och filer för en bättre ordning,

    config/database.ts: är där det skapas en kpppling med databasen, där den senare är kopplad till en express server i index.ts

    middleware: finns en middleware som är ansvarig för att kolla om det är en ny lösenord eller en redan existerande lösenord so har ändras, och sedan lösenordet blir krypterat med bcrypt och den middleware impoerteras i models.ts filen

    model.ts : där scheman för users och task finns samt middlware för lösenord kryptering

routes: i den mappen finns 2 filer, userRoutes och taskRoutes, där finns alla CRUD operationer som är kopplade till index.ts filen
