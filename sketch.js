let table;

function preload() {
  table = loadTable("dataset.csv","csv","header");

}

function setup() {
//controllo se ho inserito i dati
  console.log(table);
  createCanvas(windowWidth, windowHeight);
  // put setup code here
 
  let outerPadding = 70;
let padding = 45;
let itemSize = 45;
//calcoliamo il numero di colonne
let cols = floor((windowWidth - outerPadding * 2 + 95)/ (itemSize + padding)) //floor abbassa il valore dato che non è nemero intero
  console.log(cols);

  let rows = ceil(table.getRowCount() / cols); //approssima per eccesso
let totalHeight = outerPadding * 2  + rows * itemSize + (rows - 1)* padding;

createCanvas(windowWidth,totalHeight);
 background("white");
  console.log("cols" , cols, "rows", rows);

  let colCount = 0
  let rowCount = 0

for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
  console.log(rowNumber);

  let data = table.getRow(rowNumber).obj; //. vuol dire che è collegato dentro rownumber e che si trova all'interno. così vediamo quello in console
  console.log(data);

  //prendo valore per dimensione
  let myValue = data ["column0"];

  //calcola min e max
  let allValues = table.getColumn("column0");
  let minValue = min(allValues);
  let maxValue = max(allValues);

  let scaledValue = map (myValue,minValue,maxValue,28,itemSize);

  //variabiule colore
  let value2 = data ["column2"];
  let allValue2 = table.getColumn("column2");
  let minValue2 = min(allValue2);
  let maxValue2 = max(allValue2);
  let value2Mapped = map(value2,minValue2,maxValue2,0,2);
  let c1 = color(0,0,0);
  let c2 = color(0,0,0,100);
  let mappedColor = lerpColor(c1,c2,value2Mapped);
  fill(mappedColor);

  let xPos = outerPadding + colCount * (itemSize + padding);
  let yPos =  outerPadding + rowCount * (itemSize + padding);

// disegno l'ellisse centrale con spessore random
stroke(mappedColor);
fill(random(235,255));
ellipse(xPos, yPos, scaledValue, scaledValue);


// disegno il buco interno (un cerchio nero più piccolo al centro)
fill(255); // colore sfondo (nero)
ellipse(xPos, yPos, scaledValue / 2, scaledValue / 2);

// disegno la linea 
push();               
translate(xPos, yPos); // sposta l’origine al centro ellisse
rotate(radians(45));   // ruota di 45 gradi (in radianti)

stroke(mappedColor);
strokeWeight(scaledValue/25);
line(-scaledValue / 2, 0, scaledValue / 2, 0);  // linea orizzontale centrata in 0,0
pop(); 


// disegno cerchi concentrici sottili con spessore random
push();
noFill();
let strokeWeightCircles = random(0.1, 2.2); // spessore random per i cerchi sottili
stroke(lerpColor(c1, c2, value2Mapped));
strokeWeight(strokeWeightCircles);
ellipse(xPos, yPos, scaledValue * 1.1 , scaledValue * 1.1);
ellipse(xPos, yPos, scaledValue * 0.8, scaledValue * 0.8 );
pop();

// Curve morbide sopra e sotto l'ellisse con forma random
push();
noFill();
stroke(lerpColor(c2, c1, value2Mapped));
strokeWeight(1.2);
translate(xPos, yPos);

let curveAmp = scaledValue * 0.3 * value2Mapped; //altezza 
let w = scaledValue * random(0.5, 0.9);  // Larghezza delle curve 

let r1 = random(0.8, 1.2); // Variabilità random per ogni punto della curva
let r2 = random(0.6, 1.1);
let r3 = random(0.9, 1.3);
let r4 = random(0.6, 1.1);

beginShape(); // curva superiore
curveVertex(-w, curveAmp * r1);
curveVertex(-w * 0.5, curveAmp * 1.5 * r2);
curveVertex(0, curveAmp * r3); // centro "strozzato"
curveVertex(w * 0.5, curveAmp * 1.5 * r4);
curveVertex(w, curveAmp * r1);
endShape();

beginShape(); // curva inferiore (speculare)
curveVertex(-w, -curveAmp * r1);
curveVertex(-w * 0.5, -curveAmp * 1.5 * r2);
curveVertex(0, -curveAmp * r3);
curveVertex(w * 0.5, -curveAmp * 1.5 * r4);
curveVertex(w, -curveAmp * r1);
endShape();
pop();


//Piccoli punti di numero random
push();
noStroke();
fill(lerpColor(c2, c1, value2Mapped), 150);
let pointsCount = max(3, floor(scaledValue / random(1, 4))); // minimo 3 punti

for(let i = 0; i < pointsCount; i++){
  let angle = TWO_PI / pointsCount * i + frameCount * 0.02 * (i + 1);
  let radius = scaledValue * 0.7 + sin(frameCount * 0.03 + i) * scaledValue * 0.1;
  let px = xPos + cos(angle) * radius;
  let py = yPos + sin(angle) * radius;
  ellipse(px, py, scaledValue / 15, scaledValue / 15);
}
pop();


  //ad ogni ciclo colCount aumenta
colCount++;

//controlla se siamo a fine riga
if (colCount == cols){
  colCount = 0;
  rowCount++;
}
}
}
