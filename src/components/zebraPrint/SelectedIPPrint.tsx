import React from 'react';
import ZebraIPs from '../../JSON/ZebraIP.json';
import './_selectedIP.scss';

type SelectedIPPrintProps = {
      setSelectedIp: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectedIPPrint: React.FC<SelectedIPPrintProps> = ({ setSelectedIp }) => {
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = e.target.value;
            const selectedIPs = selectedValue ? [selectedValue] : []; // Stockez la valeur dans un tableau
            setSelectedIp(selectedIPs);
            console.log(selectedValue);
      };

      return (
            <div className='container-select'>
                  <select className="selectIP" onChange={handleSelectChange}>
                        <option value="">Sélectionner une imprimante</option>
                        {ZebraIPs.map((printer) => (
                              <option key={printer.id} value={printer.ip}>
                                    {printer.name}
                              </option>
                        ))}
                  </select>
            </div>
      );
};

export default SelectedIPPrint;
