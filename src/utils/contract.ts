import { ethers } from 'ethers';
import contractAbi from '@/contracts/TalentoTechAbi.json';
import { provider } from './ethersConfig';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contratoTalentoTech = new ethers.Contract(contractAddress, contractAbi, provider);

export default contratoTalentoTech;
