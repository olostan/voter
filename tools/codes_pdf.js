const fs = require('fs');
const PDFDocument = require('pdfkit');
const codes = require('./codes.json');

genPdf(1,200);
genPdf(201,400);
genPdf(401,600);

function genPdf(from,to) {
let doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output-'+from+'-'+to+'.pdf'));
for (var flat=from;flat<=to;flat++) {
    if (flat!=10) doc.addPage();
    doc.font('fonts/Roboto-Light.ttf');
    doc.fontSize(25);
    
    doc.text("Шановні мешканці квартири №"+flat+"!",{align: 'center'});
    doc.fontSize(12);
    doc.moveDown();
    doc.text('Останнім часом у активної групи мешканців нашого будинку виникають дуже багато питань щодо '+
        'благоустрію. Нажаль, не завжди можна знайти рішення, що підходить усім. Для того, щоб '+
        'забеспечити врахування думки більшості мешканців, була запровадженна система опитувань.',{align:'justify'});
    doc.moveDown();
    doc.text('Нище Ви знайдете унікальний код для Вашої за допомогою якого Ви зможете зарееструватись '+
        'у нашій системі перешовши по посиланню:',{align:'justify'});
    doc.moveDown();
    doc.fontSize(20);
    doc.font('fonts/Roboto-Bold.ttf');
    doc.text("https://voter-55a48.firebaseapp.com",{align: 'center'});        
    doc.moveDown();
    doc.font('fonts/Roboto-Light.ttf');
    doc.text("Ваш код:",{align: 'center'});        
    doc.moveDown();

    doc.font('fonts/Roboto-Bold.ttf');
    doc.text(codes[flat],{align: 'center'});            
    doc.rect(260, doc.y-30 ,95,35).stroke()
    doc.moveDown();

    doc.fontSize(12);
    doc.font('fonts/Roboto-Light.ttf');
    doc.text("Після реестрації Ви зможете прийняти участь в опитуваннях та створювати свої. Більше деталей Ви зможете дізнатись в Viber або Telegram групах мешканців нашого будинка.",{align: 'justify'});        

}
doc.end();
}
