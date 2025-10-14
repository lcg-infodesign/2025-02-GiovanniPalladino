let table;

function preload() {
  table = loadTable("dataset.csv","csv","header");

}

function setup() {
//controllo se ho inserito i dati
  console.log(table);
  createCanvas(windowWidth, windowHeight);
  // put setup code here
 
  let outerPadding = 20;
let padding = 10;
let itemSize = 30;
//calcoliamo il numero di colonne
let cols = floor((windowWidth - outerPadding * 2)/ (itemSize + padding)) //floor abbassa il valore dato che non è nemero intero
  console.log(cols);

  let rows = ceil(table.getRowCount() / cols); //approssima per eccesso
let totalHeight = outerPadding * 2  + rows * itemSize + (rows - 1)* padding;

createCanvas(windowWidth,totalHeight);
 background("green");
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

  let scaledValue = map (myValue,minValue,maxValue,1,itemSize);

  //variabiule colore
  let value2 = data ["column2"];
  let allValue2 = table.getColumn("column2");
  let minValue2 = min(allValue2);
  let maxValue2 = max(allValue2);
  let value2Mapped = map(value2,minValue2,maxValue2,0,1);
  let c1 = color("red");
  let c2 = color("blue");
  let mappedColor = lerpColor(c1,c2,value2Mapped);
  fill(mappedColor);

  let xPos = outerPadding + colCount * (itemSize + padding);
  let yPos =  outerPadding + rowCount * (itemSize + padding);

  rect(xPos,yPos,scaledValue,scaledValue);
  
  //ad ogni ciclo colCount aumenta
colCount++;

//controlla se siamo a fine riga
if (colCount == cols){
  colCount = 0;
  rowCount++;
}
}
}


function draw() {
  // put drawing code here
}

