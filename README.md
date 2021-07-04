# transactions-app

## Presentation
project display application mobile with Ionic 5:
- List of transactions ;
- Option sorting and filtering (click on the icon top/right on home page) ;
- Add new transaction (button bottom home page) ;
- Edit/delete transaction: sliding right to left the item in the list to show edit/delete buttons ;

## Requirements
- Create CRUD Application (Done) ;
- Use Angular/ionic (Done) ;
- Apply validation rules (Done) ;
- Use Rxjs (Done) ;
- Format data differently (BE/FE) for date, amount, iban (Done) ;
- Unit test with high coverage: service, pipe, function, component, page samples ;

## Not delivery
- Stencil integration: no real option to do this... all components are provided by Ionic ;
- Materiel UI or over UI Lib: not necessary with Ionic application ;
- Mobile first (responsive): because Ionic is used application is builded mobile only - hybrid mobile app ;
- Node Server: no BE app. - Http service is there to mock this. 

## Installation
Install deps:

‘‘‘‘
npm install && npx ionic serve --lab
‘‘‘‘

Will start a server on a specific port with IOS and Android versions on same screen.
