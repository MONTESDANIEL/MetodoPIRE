import GraficaEspectral from "./src/components/Grafica";



export const calculo = (transmisores, datosPisoRuido) => {

    const constBotzman = 1.38e-23;
    const pisoRuidoW = constBotzman * datosPisoRuido.temperatura * datosPisoRuido.anchoDeBandaGeneral
    const pisoRuidodBm = Math.round((10 * Math.log10(pisoRuidoW)) + 30)

    const calcularPIRE = (potencia, gananciaAmp, gananciaAnt, perdidas) => {
        return Number(potencia) + Number(gananciaAmp) + Number(gananciaAnt) - Number(perdidas);
    };

    const resultadosPIRE = transmisores.map((transmisor) => {
        return calcularPIRE(transmisor.potencia, datosPisoRuido.gananciaAmplificador, datosPisoRuido.gananciaAntena, datosPisoRuido.perdida);
    });

    console.log('PIRES 1: ', resultadosPIRE[0])

    const señales = [
        { center: parseInt(transmisores[0].frecuencia), bandwidth: parseInt(transmisores[0].anchoDeBanda), pire: resultadosPIRE[0] }, // Señal 1
        { center: parseInt(transmisores[1].frecuencia), bandwidth: parseInt(transmisores[1].anchoDeBanda), pire: resultadosPIRE[1] }, // Señal 2
        { center: parseInt(transmisores[2].frecuencia), bandwidth: parseInt(transmisores[2].anchoDeBanda), pire: resultadosPIRE[2] }, // Señal 3
    ]

    return {señales, pisoRuidodBm}
}