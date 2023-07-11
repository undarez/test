import React, { useEffect } from 'react';
import './_zebra.scss';
import { useUpdateContext, useNumCopies, useIPZebraContext } from '../../context/context';
import SelectedIPPrint from '../zebraPrint/SelectedIPPrint';
import { printWithZebra } from '../zebraPrint/printzebratest';
import SelectedLocation, { CR1Placement } from '../selectLocation/SelectedLocation';

interface ZebraprintProps {
  data: CR1Placement | undefined;
}

const Zebraprint: React.FC<ZebraprintProps> = ({ data }) => {
  const { selectedLocation, setSelectedLocation } = useUpdateContext();
  const { numCopies, setNumCopies } = useNumCopies();
  const { IpAdress, setIpAdress } = useIPZebraContext();
  const printerLocation = '';

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
    return location.replace(/-/g, '');
  };

  const generateQRCodeData = (location: string) => {
    return `https://example.com/location/${encodeURIComponent(location)}`;
  };

  const handlePrintBarcode = async () => {
    const barcodeData = generateBarcodeData(data?.name || '');
    try {
      await printWithZebra(barcodeData, printerLocation, numCopies);
      console.log('Impression du code à barres réussie !');
    } catch (error) {
      console.error("Erreur lors de l'impression du code à barres :", error);
    }
  };

  const handlePrintQRCode = async () => {
    const qrCodeData = generateQRCodeData(data?.name || '');

    try {
      await printWithZebra(qrCodeData, printerLocation, numCopies);
      console.log('Impression du QR code réussie !');
    } catch (error) {
      console.error("Erreur lors de l'impression du QR code :", error);
    }
  };

  return (
    <div className="container-button-2">
      <div className="container-bloc-button">
        <div className='placement-button'>

        <input
          type="number"
          onChange={(e) => setNumCopies(Number(e.target.value))}
        />
        <button
          className="buttonCss-3"
          type="button"
          onClick={() => {
            data?.name &&
              printWithZebra(data.name, printerLocation, numCopies);
          }}
        >
          Imprimer Code à Barres
        </button>

        <input
        
          type="number"
          onChange={(e) => setNumCopies(Number(e.target.value))}
        />
        
        <button
          className="buttonCss-3"
          type="button"
          onClick={() => {
            data?.name &&
              printWithZebra(data.name, printerLocation, numCopies);
          }}
        >
          Imprimer QR Code
        </button>
        </div>

        <SelectedIPPrint setSelectedIp={setIpAdress} />

      </div>
    </div>
  );
};

export default Zebraprint;
