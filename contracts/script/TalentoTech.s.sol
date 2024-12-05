// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TalentoTech} from "../src/TalentoTech.sol";

contract TalentoTechScript is Script {
    TalentoTech public talentoTech;

    address initialOwner = 0x138A7d8aE48280B1cB9E2Dd521d761Db39C1A152; // Dirección del dueño inicial
    uint256 initialPrice = 0.1 ether; // Precio inicial para los NFTs

    function setUp() public {}

    function run() public {
        vm.startBroadcast();  // Comienza la transmisión para desplegar el contrato

        talentoTech = new TalentoTech(initialOwner, initialPrice); // Desplegamos el contrato con el dueño inicial y precio

        vm.stopBroadcast();  // Detiene la transmisión después del despliegue
    }
}
