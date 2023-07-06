import React, { useContext, createContext, useState } from 'react';

// Définition du type pour selectedLocation
type CR1Placement = {
  name: string;
  // Propriétés de selectedLocation
};

// Définition du type pour l'adresse IP
type ipZebraPrint = {
  selectedIp: string;
  setSelectedIp: React.Dispatch<React.SetStateAction<string>>;
};

// Définition du type pour le contexte
type ContextType = {
  text: string;
  settext: React.Dispatch<React.SetStateAction<string>>;
  sizeState: number;
  setsizeState: React.Dispatch<React.SetStateAction<number>>;
  bgColorState: string;
  setbgColorState: React.Dispatch<React.SetStateAction<string>>;
  colorState: string;
  setColorState: React.Dispatch<React.SetStateAction<string>>;
  selectedLocation: CR1Placement | undefined;
  setSelectedLocation: React.Dispatch<React.SetStateAction<CR1Placement | undefined>>;
};

const Context = createContext<ContextType>({
  text: '',
  settext: () => {},
  sizeState: 0,
  setsizeState: () => {},
  bgColorState: '',
  setbgColorState: () => {},
  colorState: '',
  setColorState: () => {},
  selectedLocation: undefined,
  setSelectedLocation: () => {},
});

const IpContext = createContext<ipZebraPrint>({
  selectedIp: '',
  setSelectedIp: () => {},
});

export const UpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [text, settext] = useState<string>('example');
  const [sizeState, setsizeState] = useState<number>(180);
  const [bgColorState, setbgColorState] = useState<string>('#ffffff');
  const [colorState, setColorState] = useState<string>('#000000');
  const [selectedLocation, setSelectedLocation] = useState<CR1Placement | undefined>(undefined);
  const [selectedIp, setSelectedIp] = useState<string>('');

  return (
    <Context.Provider
      value={{
        text,
        settext,
        sizeState,
        setsizeState,
        bgColorState,
        setbgColorState,
        colorState,
        setColorState,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      <IpContext.Provider value={{ selectedIp, setSelectedIp }}>
        {children}
      </IpContext.Provider>
    </Context.Provider>
  );
};

export const useUpdateContext = (): ContextType => useContext(Context);
export const useIpContext = (): ipZebraPrint => useContext(IpContext);
