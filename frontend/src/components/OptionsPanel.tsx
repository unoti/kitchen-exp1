import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerHeader, Button } from '@fluentui/react-components';
import { Settings24Regular } from '@fluentui/react-icons';
import PlayerProfile from './PlayerProfile';

interface OptionsPanelProps {
  onSave: (name: string) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ onSave }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <Button onClick={toggleDrawer}>{open ? 'Close Options' : <Settings24Regular />}</Button>
      <Drawer 
        open={open} 
        onOpenChange={(event, data) => setOpen(data.open)}
        style={{ transition: 'transform 0.3s ease' }}
      >
        <DrawerHeader>
          <h2>Options</h2>
        </DrawerHeader>
        <DrawerBody>
          <PlayerProfile 
            onClose={() => setOpen(false)} 
            onSave={(name: string) => {
              onSave(name);
              setOpen(false);
            }}
          />
        </DrawerBody>
      </Drawer>
    </>
  );
};

export default OptionsPanel;
