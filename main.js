"use strict"

//declaracioness 

//variables para calculo
 var peso = document.getElementById('peso');
 var altura = document.getElementById('peso');
 var boton = document.getElementById('calcular');

 var imc = 0;
 var imcIdeal = [];
 var imcText = "";

//variables del grafico

//calculo del imc
//peso en kg altura en m
calcular.addEventListener('click', //se decta el evento de envio del fomulario
    ()=>{

        //se recojen los valores
        peso = parseFloat(document.getElementById('peso').value); 
        altura = parseFloat(document.getElementById('altura').value);

        imc = (peso / altura ** 2).toFixed(2); //calculo del IMC
 
        //intervalo de imc ideal
        imcIdeal[0] = (18.6 * altura ** 2).toFixed(2);
        imcIdeal[1] = (24.9 * altura ** 2).toFixed(2);

        //se determina en que rango se encuentra en base al imc
        if(imc<=18.5)
        {
            imcText = "Peso bajo";
        }
        else if(imc>=18.6 && imc<=24.9)
        {
            imcText = "Peso normal";
        }
        else if(imc>=25 && imc<=29.9)
        {
            imcText = "sobre peso";
        }
        else if(imc>=30 && imc<=34.9)
        {
            imcText = "obesidad grado I ";
        }
        else if(imc>=35 && imc<=39.9)
        {
            imcText = "obesidad grdo II";
        }
        else if(imc>=40)
        {
            imcText = "obesidad grado III";
        }


        console.log(peso);
        console.log(altura);


        console.log(imcText, imc);
        console.log("peso ideal enrtre", imcIdeal[0], "y", imcIdeal[1]);
        console.log(imcIdeal);

        //Escribir resultados
        document.getElementById('resultadoPeso').innerHTML = "Peso: " + peso + "Kg";
        document.getElementById('resultadoAltura').innerHTML = "Altura: " + altura + "m";
        document.getElementById('imcResultado').innerHTML = "IMC: " + imc;
        document.getElementById('diagnosticoS').innerHTML = imcText;
        document.getElementById('resultadoPesoideal').innerHTML = "Peso ideal entre " + imcIdeal[0] + "Kg" + " y " + imcIdeal[1] + "Kg";

        //se formatea el formulario
        peso = "";
        altura = "";
        });

