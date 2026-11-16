import React, { useState } from 'react';
import { useSetPrice, useWithdraw } from '@/hooks/writeHooks';
import { Button, Input } from '@nextui-org/react'
import { parsePriceInput } from '@/utils/price';

const DashboardOwner: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const { setPrice } = useSetPrice();
  const { withdraw } = useWithdraw();

  const handleSetPrice = () => {
    const result = parsePriceInput(value);
    if ('error' in result) {
      setError(result.error);
      return;
    }
    setError('');
    setPrice(result.wei);
  };

  const handleWithdraw = () => {
    withdraw();
  };

  return (
    <header className="dashboard-header" style={{ textAlign: 'center', marginTop: '20px' }}>

      <div className="flex justify-center items-start gap-4 my-4">
        <p className="text-lg font-bold">Establecer precio de los NFTs (ETH):</p>
        <Input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          min={0}
          step="any"
          isInvalid={error !== ''}
          errorMessage={error}
          className="w-40"
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
