import ZebraIP from '../../JSON/ZebraIP.json'

export const selectedIPOptions = (): string =>{
    ZebraIP.forEach((printer) => {
        console.log(`${printer.id}, ${printer.ip}, ${printer.name}`);
    })
    const selectedPrinterIP = prompt('Veuillez sélectionner l\'imprimante (entrez l\'IP) :') || '';
    return selectedPrinterIP
}
