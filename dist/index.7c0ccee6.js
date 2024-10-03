(()=>{
    const App = {
        elementosHtml: {
            pantalla: document.getElementById("pantalla"),
            botones: document.querySelectorAll(".calculadora__boton")
        },
        init () {
            this.definicionDeEventos();
        },
        definicionDeEventos () {
            App.elementosHtml.botones.forEach((boton)=>{
                boton.addEventListener("click", App.metodos.validarDato);
            });
        },
        metodos: {
            pantallaActual: "",
            pantallaAnterior: "",
            operador: "",
            resultado: "",
            validarDato (event) {
                let botonClicado = event.target;
                let valorBotonDataSet = botonClicado.dataset.valor;
                if (!isNaN(valorBotonDataSet) || valorBotonDataSet === "." || valorBotonDataSet === "-" || valorBotonDataSet === "+" || valorBotonDataSet === "x" || valorBotonDataSet === "/" || valorBotonDataSet === "=" || valorBotonDataSet === "c") switch(valorBotonDataSet){
                    case "+":
                    case "-":
                    case "x":
                    case "/":
                        App.metodos.pantallaAnterior = App.metodos.pantallaActual;
                        App.metodos.operador = valorBotonDataSet;
                        App.metodos.pantallaActual = "";
                        App.metodos.actualizarPantalla(App.metodos.operador);
                        break;
                    case "=":
                        App.metodos.realizarCalculo();
                        break;
                    case "c":
                        App.metodos.limpiarPantalla();
                        break;
                    default:
                        if (!isNaN(App.metodos.pantallaActual) && !isNaN(App.metodos.pantallaAnterior)) {
                            if (App.metodos.pantallaAnterior === "" && App.metodos.pantallaActual === "") App.metodos.pantallaActual = valorBotonDataSet;
                            else App.metodos.pantallaActual += valorBotonDataSet;
                        }
                        App.metodos.actualizarPantalla(App.metodos.pantallaActual);
                        break;
                }
                console.log(App.metodos.pantallaActual);
                console.log(botonClicado);
            },
            actualizarPantalla (valorPantalla) {
                pantalla = App.elementosHtml.pantalla;
                pantalla.innerText = String(valorPantalla).slice(0, 16);
            },
            limpiarPantalla () {
                App.metodos.pantallaActual = "";
                App.metodos.pantallaAnterior = "";
                App.metodos.operador = "";
                App.metodos.resultado = "";
                App.metodos.actualizarPantalla("0");
            },
            realizarCalculo () {
                switch(App.metodos.operador){
                    case "+":
                        App.metodos.resultado = parseFloat(App.metodos.pantallaAnterior) + parseFloat(App.metodos.pantallaActual);
                        break;
                    case "-":
                        App.metodos.resultado = parseFloat(App.metodos.pantallaAnterior) - parseFloat(App.metodos.pantallaActual);
                        break;
                    case "x":
                        App.metodos.resultado = parseFloat(App.metodos.pantallaAnterior) * parseFloat(App.metodos.pantallaActual);
                        break;
                    case "/":
                        if (parseFloat(App.metodos.pantallaActual) === 0) App.metodos.resultado = "No v\xe1lido";
                        if (App.metodos.pantallaActual === "") App.metodos.pantallaActual = "";
                        if (parseFloat(App.metodos.pantallaActual) != 0 && !isNaN(App.metodos.pantallaActual)) {
                            App.metodos.resultado = parseFloat(App.metodos.pantallaAnterior) / parseFloat(App.metodos.pantallaActual);
                            App.metodos.pantallaActual = "";
                        }
                        break;
                    default:
                        App.metodos.resultado = "No v\xe1lido";
                        App.metodos.pantallaActual = "";
                        App.metodos.pantallaAnterior = "";
                        App.metodos.operador = "";
                        break;
                }
                App.metodos.actualizarPantalla(App.metodos.resultado);
                App.metodos.pantallaActual = App.metodos.resultado;
                App.metodos.pantallaAnterior = "";
                App.metodos.operador = "";
            }
        }
    };
    App.init();
})();

//# sourceMappingURL=index.7c0ccee6.js.map
