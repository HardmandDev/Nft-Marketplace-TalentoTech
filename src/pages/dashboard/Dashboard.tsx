import React from "react";
import DashboardOwner from "./DashboardOwner";
import DashboardNonOwner from "./DashboardNonOwner";
import { useAccount } from "wagmi";
import { useOwner } from '@/hooks/readHooks';

const Dashboard: React.FC = () => {
  const { address, status } = useAccount();
  const { data: owner } = useOwner();

  const isOwner = status === 'connected' && address === owner;

  return (
    <>
    <div className="my-4">
      {isOwner && <DashboardOwner />}
    </div>
      <DashboardNonOwner />
    </>
  );
};

export default Dashboard;
