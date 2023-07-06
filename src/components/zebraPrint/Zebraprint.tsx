import React, {  useEffect } from 'react';
import './_zebra.scss';
import { useUpdateContext } from '../../context/context';
// import ZebraIPs from '../../JSON/ZebraIP.json';
import SelectedLocation, { CR1Placement } from '../selectLocation/SelectedLocation';
import { printWithZebra } from '../zebraPrint/printzebratest';

interface ZebraprintProps {
  data: CR1Placement | undefined;
}

const Zebraprint: React.FC<ZebraprintProps> = ({ data }) => {
  const { selectedLocation, setSelectedLocation } = useUpdateContext();
  console.log(data);

  useEffect(() => {
    if (data && data.Id) {
      const location: CR1Placement = {
        Id: data.Id,
        name: data.name,
      };
      setSelectedLocation(location);
    }
    console.log(data?.name);
  }, [data, setSelectedLocation]);

  const generateBarcodeData = (location: string) => {
    // Générez les données du code à barres en utilisant l'emplacement
    return location.replace(/-/g, '');
  };

  const generateQRCodeData = (location: string) => {
    // Générez les données du QR code en utilisant l'emplacement
    return `https://example.com/location/${encodeURIComponent(location)}`;
  };

  const handlePrintBarcode = async () => {
    const barcodeData = generateBarcodeData(data?.name || '');
    try {
      await printWithZebra(barcodeData); // Appel de la fonction d'impression pour Zebra avec les données du code à barres
      console.log('Impression du code à barres réussie !');
    } catch (error) {
      console.error('Erreur lors de l\'impression du code à barres :', error);
    }
  };

  const handlePrintQRCode = async () => {
    const qrCodeData = generateQRCodeData(data?.name || '');
    try {
      await printWithZebra(qrCodeData); // Appel de la fonction d'impression pour Zebra avec les données du QR code
      console.log('Impression du QR code réussie !');
    } catch (error) {
      console.error('Erreur lors de l\'impression du QR code :', error);
    }
  };

  return (
    <div className='container-button-2'>
      {/* Bouton pour l'impression du code à barres */}
      <button className='buttonCss-2' type='button' onClick={handlePrintBarcode}>Imprimer Code à Barres</button>

      {/* Bouton pour l'impression du QR code */}
      <button className='buttonCss-2' type='button' onClick={handlePrintQRCode}>Imprimer QR Code</button>
    </div>
  );
};

export default Zebraprint;



// import axios from 'axios';
// import cors from 'cors';
// import useZebraPrint from 'zebra-browser-print-wrapper';()

// type ZebraPrintName = {
  //       name: string;
  //       ipAdress: string;
  // };
  
  // // export const handlePrintRequest = (selectedLocation: CR1Placement | undefined) => {
    // //   const data = selectedLocation?.name;
    // // console.log(data)
    // //   // if (data) {
      // //   //   axios
// //   //     .post('http://localhost:9100/write', { data })
// //   //     .then(response => {
// //   //       console.log('Requête d\'impression réussie');
// //   //       console.log(response.data); // Affiche la réponse du serveur
// //   //       // Traitez la réponse du serveur si nécessaire, par exemple, affichez un message de confirmation à l'utilisateur
// //   //     })
// //   //     .catch(error => {
  // //   //       console.error('Erreur lors de la requête d\'impression:', error);
  // //   //       // Traitez l'erreur si nécessaire
  // //   //     });
  // //   // } else {
// //   //   console.error('La valeur de selectedLocation.name est undefined');
// //   // }
// // };

// export const handlePrintQrcodeZebra = (
//       selectedLocation: CR1Placement | undefined
// ) => {
//       const zebraPrinter = new useZebraPrint();
//       const data = selectedLocation?.name; // Le texte à imprimer (par exemple, le contenu du code QR)
//       console.log(data);

//       zebraPrinter.print(data!).then((res) => console.log(res));

//       // if (data) {
//       //   // Vérifiez si l'imprimante est prête à imprimer
//       //   zebraPrinter.checkPrinterStatus().then((status) => {
//       //     if (status.isReadyToPrint) {
//       //       // Imprimez le code QR
//       //       zebraPrinter.print(data).then(() => {
//       //         console.log('Impression réussie');
//       //       }).catch((error) => {
//       //         console.error('Erreur d\'impression:', error);
//       //       });
//       //     } else {
//       //       console.error('L\'imprimante n\'est pas prête à imprimer');
//       //     }
//       //   }).catch((error) => {
//       //     console.error('Erreur lors de la vérification du statut de l\'imprimante:', error);
//       //   });
//       // } else {
//       //   console.error('La valeur de selectedLocation.name est undefined');
//       // }
// };

// export const handlePrintBarcodeZebra = async (
//       selectedLocation: CR1Placement | undefined
// ) => {
//       const zebraPrinter = new useZebraPrint();
//       const barcodeData = selectedLocation?.name; // Les données du code-barres à imprimer
//       console.log(barcodeData);
//       if (barcodeData) {
//             const defaultPrinter = await zebraPrinter.getDefaultPrinter();
//             zebraPrinter.setPrinter(defaultPrinter);
//             const printerStatus = await zebraPrinter.checkPrinterStatus();
//             if (printerStatus.isReadyToPrint) {
//                   const zpl = `^XA
//           ^FO0,0^CF0,30^FB720,1,0,C^FD${selectedLocation?.name}^FS
//           ^FO0,120^BY2^B3N,N,90,Y,N^FD${selectedLocation?.name}^FS
//   ^XZ`;
//                   zebraPrinter.print(zpl);
//             } else {
//                   console.log('cela ne fonctionne pas', printerStatus.errors);
//             }
//       }
// };
// // if (barcodeData) {
// //   // Vérifiez si l'imprimante est prête à imprimer
// //   zebraPrinter.checkPrinterStatus().then((status) => {
// //     if (status.isReadyToPrint) {
// //       // Écrivez le code-barres
// //       zebraPrinter.write(barcodeData).then(() => {
// //         console.log('Écriture du code-barres réussie');
// //       }).catch((error) => {
// //         console.error('Erreur lors de l\'écriture du code-barres:', error);
// //       });
// //     } else {
// //       console.error('L\'imprimante n\'est pas prête à imprimer');
// //     }
// //   }).catch((error) => {
// //     console.error('Erreur lors de la vérification du statut de l\'imprimante:', error);
// //   });
// // } else {
// //   console.error('La valeur de selectedLocation.name est undefined');
// // }

// const Zebraprint = () => {
//       const { selectedIp, setSelectedIp } = useIpContext();
//       const [selectedLocation, setSelectedLocation] = useState<CR1Placement>();

//       const zebraPrintDeafault: ZebraPrintName = {
//             name: 'zebra recep 2',
//             ipAdress: '10.91.18.83',
//       };

//       // const handleLocationUpdate = (location: CR1Placement | undefined) => {
//       //   setSelectedLocation(location);
//       // };

//       useEffect(() => {
//             if (selectedLocation && selectedLocation.Id) {
//                   handlePrintBarcodeZebra(selectedLocation);
//                   handlePrintQrcodeZebra(selectedLocation);
//             } else {
//                   console.error("selectedLocation n'est pas valide");
//             }
//       }, [selectedLocation]);

//       return (
//             <div className="container-selectIp">
//                   <select
//                         value={selectedIp || zebraPrintDeafault.ipAdress}
//                         onChange={(event) => setSelectedIp(event.target.value)}
//                   >
//                         <option className="option-container" value="">
//                               Sélectionner l'adresse IP de votre Zebra
//                         </option>
//                         {ZebraIp.map((item) => (
//                               <option key={item.id} value={item.ip}>
//                                     {item.name}
//                               </option>
//                         ))}
//                   </select>
//             </div>
//       );
// };

