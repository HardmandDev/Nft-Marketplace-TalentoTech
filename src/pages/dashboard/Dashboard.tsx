import React from "react";
import DashboardOwner from "./DashboardOwner";
import DashboardNonOwner from "./DashboardNonOwner";
import { useAccount } from "wagmi";
import { useOwner } from '@/hooks/readHooks';

const Dashboard: React.FC = () => {
  const { address, status } = useAccount();
  const { data: owner } = useOwner();

  // Las direcciones pueden venir con distinta capitalización (checksum o minúsculas).
  const isOwner =
    status === 'connected' &&
    typeof owner === 'string' &&
    address?.toLowerCase() === owner.toLowerCase();

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
