import ZebraPrintBrowser from 'zebra-browser-print-wrapper';
import { Device } from 'zebra-browser-print-wrapper/lib/types';
import ZebraIPs from '../../JSON/ZebraIP.json';

export const printWithZebra = async (
      data: string,
      printerLocation: string,
      numCopies: number
): Promise<void> => {
      const zebraPrinter = new ZebraPrintBrowser();
      try {
            const printerIP = '10.91.18.83'; // Remplacez cette valeur par l'adresse IP de l'imprimante souhaitée

            const selectedPrinter = ZebraIPs.find(
                  (printer) => printer.ip === printerIP
            );

            if (selectedPrinter) {
                  const device: Device = {
                        name: selectedPrinter.name,
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
                        ^P${numCopies}
        ^FO0,0^CF0,30^FB720,1,0,C^FD${data}^FS 
        ^FO0,120^BY2^B3N,N,90,Y,N^FD${data}^FS
        ^FO0,250^BQN,2,10
        ^FDLA,${data}^FS
        ^FO0,300^A0N,30,30^FD${printerLocation}^FS
        ^XZ`;

                        await zebraPrinter.print(zpl);
                  } else {
                        console.log(
                              "Erreur lors de la vérification du statut de l'imprimante:",
                              printerStatus.errors
                        );
                  }
            } else {
                  throw new Error('Imprimante non trouvée');
            }

            console.log('Impression avec Zebra réussie !');
      } catch (error) {
            console.error("Erreur lors de l'impression :", error);
      }
};
//   try {
//     const selectedPrintIP = selectedIPOptions();
//     const selectedPrinter = ZebraIPs.find((printer) => printer.name.toString() === selectedPrintIP);
//     if (selectedPrinter) {
//       const printerIP = selectedPrinter.ip;
//       const device: Device = {
//         name: 'zebra recep 2',
//         deviceType: 'printer',
//         uid: printerIP,
//         connection: 'tcp',
//         provider: '',
//         manufacturer: '',
//         version: 0,
//       };
//       console.log(selectedIPOptions())
//       zebraPrinter.setPrinter(device);

//       const printerStatus = await zebraPrinter.checkPrinterStatus();
//       if (printerStatus.isReadyToPrint) {
//         const zpl = `^XA
//           ^FO0,0^CF0,30^FB720,1,0,C^FD${data}^FS
//           ^FO0,120^BY2^B3N,N,90,Y,N^FD${data}^FS
//           ^FO0,250^BQN,2,10
//           ^FDLA,${data}^FS
//           ^XZ`;

//         await zebraPrinter.print(zpl);
//       } else {
//         console.log("Erreur lors de la vérification du statut de l'imprimante:", printerStatus.errors);
//       }
//     } else {
//       throw new Error('Imprimante non trouvée');
//     }

//     console.log('Impression avec Zebra réussie !');
//   } catch (error) {
//     console.error("Erreur lors de l'impression :", error);
//   }
// };
