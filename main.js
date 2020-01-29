"use strict"

//declaracioness 

//variables para calculo
 var peso = document.getElementById('peso');
 var altura = document.getElementById('peso');
 var boton = document.getElementById('calcular');

 var imc = "xxx";
 var pesoIdeal = [];
 var imcIdeal = 0;
 var imcText = "";
 var container = document.getElementById("legend");
 var ulGrafica = document.getElementById("ul");
 

//variables del grafico
var canvas = document.getElementById("grafica");
// var lienzo = canvas.getContext("2d");

//calculo del imc
//peso en kg altura en m
calcular.addEventListener('click', //se decta el evento de envio del fomulario
    ()=>{
        ulGrafica = document.getElementsByClassName("ul");
        

        if(imc != "xxx")
        {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
              }
            // container.removeChild(ulGrafica);
        }

        canvas.width=canvas.width;

        //se recojen los valores
        peso = parseFloat(document.getElementById('peso').value); 
        altura = parseFloat(document.getElementById('altura').value);

        imc = (peso / altura ** 2).toFixed(2); //calculo del IMC
 
        //intervalo de imc ideal
        pesoIdeal[0] = (18.6 * altura ** 2).toFixed(2);
        pesoIdeal[1] = (24.9 * altura ** 2).toFixed(2);

    

        //se determina en que rango se encuentra en base al imc
        if(imc <= 18.5)
        {
            imcText = "Peso bajo";
            imcIdeal = 18.5;
        }
        else if(imc >= 18.6 && imc <= 24.9)
        {
            imcText = "Peso normal";
            imcIdeal = imc;
        }
        else if(imc >= 25 && imc <= 29.9)
        {
            imcText = "sobre peso";
            imcIdeal = 25.9;
        }
        else if(imc >= 30 && imc <= 34.9)
        {
            imcText = "obesidad grado I ";
            imcIdeal = 25.9;
        }
        else if(imc >= 35 && imc <= 39.9)
        {
            imcText = "obesidad grdo II";
            imcIdeal = 25.9;
        }
        else if(imc >= 40)
        {
            imcText = "obesidad grado III";
            imcIdeal = 25.9;
        }

        //Escribir resultados
        document.getElementById('resultadoPeso').innerHTML = "Peso: " + peso + "Kg";
        document.getElementById('resultadoAltura').innerHTML = "Altura: " + altura + "m";
        document.getElementById('imcResultado').innerHTML = "IMC: " + imc;
        document.getElementById('diagnosticoS').innerHTML = imcText;
        document.getElementById('resultadoPesoideal').innerHTML = "Peso ideal entre " + pesoIdeal[0] + "Kg" + " y " + pesoIdeal[1] + "Kg";
   
        function drawLine(lienzo, startX, startY, endX, endY,color)
        {
            lienzo.save();
            lienzo.strokeStyle = color;
            lienzo.beginPath();
            lienzo.moveTo(startX,startY);
            lienzo.lineTo(endX,endY);
            lienzo.stroke();
            lienzo.restore();
        }
 
        function drawBar(lienzo, upperLeftCornerX, upperLeftCornerY, width, height,color)
        {
            lienzo.save();
            lienzo.fillStyle=color;
            lienzo.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
            lienzo.restore();
        }
 
        var datos = {
            "IMC": imc,
            "IMC ideal": imcIdeal
        };
 
        var Barchart = function(options)
        {
            this.options = options;
            this.canvas = options.canvas;
            this.lienzo = this.canvas.getContext("2d");
            this.colors = options.colors;
  
            this.draw = function(){
                var maxValue = 0;
                for (var categ in this.options.data){
                    maxValue = Math.max(maxValue,this.options.data[categ]);
                }
                var canvasActualHeight = this.canvas.height - this.options.padding * 2;
                var canvasActualWidth = this.canvas.width - this.options.padding * 2;
        
                //drawing the grid lines
                var gridValue = 0;
                while (gridValue <= maxValue){
                    var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
                    drawLine(
                        this.lienzo,
                        0,
                        gridY,
                        this.canvas.width,
                        gridY,
                        this.options.gridColor
                    );
                    
                    //writing grid markers
                    this.lienzo.save();
                    this.lienzo.fillStyle = this.options.gridColor;
                    this.lienzo.textBaseline="bottom"; 
                    this.lienzo.font = "bold 10px Arial";
                    this.lienzo.fillText(gridValue, 10,gridY - 2);
                    this.lienzo.restore();
        
                    gridValue+=this.options.gridScale;
                }      
  
            //drawing the bars
            var barIndex = 0;
            var numberOfBars = Object.keys(this.options.data).length;
            var barSize = (canvasActualWidth)/numberOfBars;
    
            for (categ in this.options.data){
                var val = this.options.data[categ];
                var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
                drawBar(
                    this.lienzo,
                    this.options.padding + barIndex * barSize,
                    this.canvas.height - barHeight - this.options.padding,
                    barSize,
                    barHeight,
                    this.colors[barIndex%this.colors.length]
                );
    
                barIndex++;
            }
    
            //drawing series name
            this.lienzo.save();
            this.lienzo.textBaseline="bottom";
            this.lienzo.textAlign="center";
            this.lienzo.fillStyle = "#000000";
            this.lienzo.font = "bold 14px Arial";
            this.lienzo.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
            this.lienzo.restore();  
            
            //draw legend
            barIndex = 0;
            var legend = document.getElementById("legend");
            var ul = document.createElement("ul");
            ul.id = "ul";
            legend.append(ul);
            for (categ in this.options.data){
                var li = document.createElement("li");
                li.style.listStyle = "none";
                li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
                li.style.padding = "5px";
                li.textContent = categ;
                li.id = "li";
                ul.append(li);
                barIndex++;
            }
        }

        this.draw();
    }

    var myBarchart = 
        {
            canvas:canvas,
            seriesName:"Imc",
            padding:25,
            gridScale:2,
            gridColor:"#eeeeee",
            data:datos,
            colors:["#C70039","#78DA4D"]
        };

    new Barchart(myBarchart);

});
