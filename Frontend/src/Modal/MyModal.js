import { useState } from 'react';
import { Modal, TextField } from '@mui/material';

export const MyModal = () => {
  const [value, setValue] = useState('');

  const handleClose = () => {
    // handle modal close
  };

  const handleSave = () => {
    // handle save button click
  };

  return (
    <React.Fragment>
      <Modal open={true} onClose={handleClose}>
        <div>
          <TextField
            label="Enter text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </React.Fragment>
  );
}