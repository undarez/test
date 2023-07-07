import ZebraPrintBrowser from 'zebra-browser-print-wrapper';
import { Device } from 'zebra-browser-print-wrapper/lib/types';
import { selectedIPOptions } from './selectedIPPrint';
import ZebraIPs from '../../JSON/ZebraIP.json';

export const printWithZebra = async (data: string): Promise<void> => {
  const zebraPrinter = new ZebraPrintBrowser();
  try {
    const selectedPrintIP = selectedIPOptions();
    const selectedPrinter = ZebraIPs.find((printer) => printer.name.toString() === selectedPrintIP);
    if (selectedPrinter) {
      const printerIP = selectedPrinter.ip;
      const device: Device = {
        name: 'zebra recep 2',
        deviceType: 'printer',
        uid: printerIP,
        connection: 'tcp',
        provider: '',
        manufacturer: '',
        version: 0,
      };
      zebraPrinter.setPrinter(device);

      const printerStatus = await zebraPrinter.checkPrinterStatus();
      if (printerStatus.isReadyToPrint) {
        const zpl = `^XA
          ^FO0,0^CF0,30^FB720,1,0,C^FD${data}^FS 
          ^FO0,120^BY2^B3N,N,90,Y,N^FD${data}^FS
          ^FO0,250^BQN,2,10
          ^FDLA,${data}^FS
          ^XZ`;

        await zebraPrinter.print(zpl);
      } else {
        console.log("Erreur lors de la vérification du statut de l'imprimante:", printerStatus.errors);
      }
    } else {
      throw new Error('Imprimante non trouvée');
    }

    console.log('Impression avec Zebra réussie !');
  } catch (error) {
    console.error("Erreur lors de l'impression :", error);
  }
};




// import ZebraPrintBrowser from 'zebra-browser-print-wrapper';
// import { Device } from 'zebra-browser-print-wrapper/lib/types';
// import { selectedIPOptions } from './selectedIPPrint';


// export const printWithZebra = async (data: string): Promise<void> => {
//       const zebraPrinter = new ZebraPrintBrowser();
//       try {
//             const selectedPrintIP = selectedIPOptions()
//             const selectedPrinter = ZebraIPs.find((printer) => printer.name.toString() === selectedIPOptions)
//             if (selectedPrinter) {
//                   const printerIP = selectedPrinter.ip;
//                   // Utilisez l'adresse IP de l'imprimante pour configurer l'imprimante Zebra
//                   // ...
//                 } else {
//                   throw new Error('Imprimante non trouvée');
//                 }
//             const printerIP = '10.91.18.83'; // Remplacez cette valeur par l'adresse IP de l'imprimante souhaitée
//             const device: Device = {
//                   name: 'zebra recep 2',
//                   deviceType: 'printer',
//                   uid: printerIP,
//                   connection: 'tcp',
//                   provider: '',
//                   manufacturer: '',
//                   version: 0,
//             };
//             zebraPrinter.setPrinter(device);

//             const printerStatus = await zebraPrinter.checkPrinterStatus();
//             if (printerStatus.isReadyToPrint) {
//                   const zpl = `^XA
//   ^FO0,0^CF0,30^FB720,1,0,C^FD${data}^FS 
//   ^FO0,120^BY2^B3N,N,90,Y,N^FD${data}^FS
//   ^FO0,250^BQN,2,10
//   ^FDLA,${data}^FS
//   ^XZ`;

//                   await zebraPrinter.print(zpl);
//             } else {
//                   console.log(
//                         "Erreur lors de la vérification du statut de l'imprimante:",
//                         printerStatus.errors
//                   );
//             }

//             console.log('Impression avec Zebra réussie !');
//       } catch (error) {
//             console.error("Erreur lors de l'impression :", error);
//       }
// };

// import { ZebraPrintBrowser } from 'zebra-browser-print';

// export const printWithZebra = async (data: string): Promise<void> => { // Ajoutez le paramètre 'data'
//   const zebraPrinter = new ZebraPrintBrowser();
//   try {
//     if (!(await zebraPrinter.isInstalled())) {
//       throw new Error('Zebra Browser Print is not installed.');
//     }
//     console.log(zebraPrinter.isInstalled())

//     const printerIP = '10.91.18.83'; // Remplacez cette valeur par l'adresse IP de l'imprimante souhaitée

//     await zebraPrinter.getDefaultDevice(printerIP);

//     // Connexion à l'imprimante
//     await zebraPrinter.connect();

//     // Envoi de la commande d'impression ZPL à l'imprimante
//     // La première ligne est égale à la configuration du ZPL
//     // La deuxième est égale au code-barres.
//     const zpl = `^XA
//         ^FO0,0^CF0,30^FB720,1,0,C^FD${data}^FS
//         ^FO0,120^BY2^B3N,N,90,Y,N^FD${data}^FS
//         ^XZ`;

//     await zebraPrinter.send(zpl);

//     // Déconnexion de l'imprimante
//     await zebraPrinter.disconnect();

//     console.log('Impression avec Zebra réussie !');
//   } catch (error) {
//     console.error('Erreur lors de l\'impression :', error);
//   }
// };
