import React, {  useEffect } from 'react';
import './_zebra.scss';
import { useUpdateContext, useNumCopies } from '../../context/context';
// import ZebraIPs from '../../JSON/ZebraIP.json';
import SelectedLocation, { CR1Placement } from '../selectLocation/SelectedLocation';
import { printWithZebra } from '../zebraPrint/printzebratest';


interface ZebraprintProps {
  data: CR1Placement | undefined}
const Zebraprint: React.FC<ZebraprintProps> = ({ data }) => {
  const { selectedLocation, setSelectedLocation } = useUpdateContext();
  console.log(data);
  const {numCopies, setNumCopies} = useNumCopies();
  const printerLocation = "" 
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
      await printWithZebra(barcodeData, printerLocation, numCopies); // Appel de la fonction d'impression pour Zebra avec les données du code à barres
      console.log('Impression du code à barres réussie !');
    } catch (error) {
      console.error('Erreur lors de l\'impression du code à barres :', error);
    }
  };

  const handlePrintQRCode = async () => {
    const qrCodeData = generateQRCodeData(data?.name || '');
    
    try {
      await printWithZebra(qrCodeData, printerLocation, numCopies); // Appel de la fonction d'impression pour Zebra avec les données du QR code
      console.log('Impression du QR code réussie !');
    } catch (error) {
      console.error('Erreur lors de l\'impression du QR code :', error);
    }
  };

  return (
    <div className='container-button-2'>
      {/* Bouton pour l'impression du code à barres */}
      <input type="number" value={numCopies} onChange={(e) => setNumCopies(Number(e.target.value))} />
      <button type="button" onClick={() => { data?.name && printWithZebra(data.name, printerLocation, numCopies); }}>Imprimer Code à Barres</button>
      {/* <button className='buttonCss-2' type='button' onClick={handlePrintBarcode}>Imprimer Code à Barres</button> */}



      {/* Bouton pour l'impression du QR code */}
      <input type="number" value={numCopies} onChange={(e) => setNumCopies(Number(e.target.value))} />
      <button type="button" onClick={() => { data?.name && printWithZebra(data.name, printerLocation, numCopies); }}>Imprimer QR Code</button>

    </div>
  );
};

{/* <button className='buttonCss-2' type='button' onClick={handlePrintQRCode}>Imprimer QR Code</button> */}
export default Zebraprint;





