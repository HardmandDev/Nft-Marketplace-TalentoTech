import { ethers } from 'ethers';
import abi from '@/contracts/TalentoTechAbi.json';
import { provider } from './ethersConfig';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contratoTalentoTech = new ethers.Contract(contractAddress, abi, provider);

export default contratoTalentoTech;
