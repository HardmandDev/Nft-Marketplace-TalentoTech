import React, { useState } from 'react';
import { useSetPrice, useWithdraw } from '@/hooks/writeHooks';
import { Button, Input } from '@nextui-org/react'
import { ethers } from 'ethers';

const DashboardOwner: React.FC = () => {
  const [value, setValue] = useState('');

  const { setPrice } = useSetPrice();
  const { withdraw } = useWithdraw();

  const handleSetPrice = () => {
    const priceInWei = ethers.parseUnits(value, 'ether');
    setPrice(priceInWei);
  };

  const handleWithdraw = () => {
    withdraw();
  };

  return (
    <header className="dashboard-header" style={{ textAlign: 'center', marginTop: '20px' }}>

      <div className="flex justify-center items-center gap-4 my-4">
        <p className="text-lg font-bold">Establecer precio del NFT:</p>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min={0}
          step={1}
          className="w-32" // Ajusta el tamaño del input si es necesario
        />
        <Button onClick={handleSetPrice}>Establecer Precio</Button>
      </div>

      <div>

        <Button
          onClick={handleWithdraw}
          style={{ padding: '10px 20px', backgroundColor: '#28A745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Retirar Fondos
        </Button>
      </div>
    </header>
  );
};

export default DashboardOwner;
