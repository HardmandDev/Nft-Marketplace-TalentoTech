// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TalentoTech} from "../src/TalentoTech.sol";

contract TalentoTechTest is Test {
    TalentoTech public talentoTech;
    address public user = address(0x3AAc85700397C9B28ba0F5049d7DB03Dea0A3EE6);
    address public owner = address(0x138A7d8aE48280B1cB9E2Dd521d761Db39C1A152); // Dirección del dueño inicial
    uint256 public price = 0.1 ether;

    function setUp() public {
        talentoTech = new TalentoTech(owner, price); // Desplegamos el contrato con el dueño y el precio
        vm.startPrank(owner); // Comienza la transacción como el dueño
        talentoTech.mint(); // Mintamos un NFT para probar
        vm.stopPrank(); // Termina la transacción
    }

    function test_Minting() public view {
        uint256 tokenId = 1; // El primer NFT mintiado tiene ID 1
        address nftOwner = talentoTech.ownerOf(tokenId);
        assertEq(nftOwner, owner); // Verificamos que el propietario inicial es el dueño
    }

    function test_BuyNFT() public payable {
        uint256 tokenId = 1;

        // Le damos Ether al usuario
        vm.deal(user, 1 ether);

        // Verificamos el balance inicial del contrato antes de la compra
        uint256 contractBalanceBefore = address(talentoTech).balance;

        // Guardamos el balance del usuario antes de la compra
        uint256 buyerBalanceBefore = address(user).balance;

        // El usuario compra el NFT (no es el propietario que lo compra)
        vm.startPrank(user); // Comienza la transacción como el usuario
        talentoTech.buyNFT{value: price}(tokenId);
        vm.stopPrank(); // Termina la transacción

        // Verificamos que el dueño del NFT haya cambiado
        assertEq(talentoTech.ownerOf(tokenId), user);

        // Verificamos el historial de compradores
        assertEq(talentoTech.getBuyer(tokenId), user);

        // Verificamos el balance de Ether del contrato
        uint256 contractBalanceAfter = address(talentoTech).balance;
        assertEq(contractBalanceAfter, contractBalanceBefore + price); // El balance debe haberse incrementado

        // Verificamos que el saldo del comprador haya disminuido correctamente
        uint256 buyerBalanceAfter = address(user).balance;
        assertEq(buyerBalanceAfter, buyerBalanceBefore - price); // El saldo del comprador debe haber disminuido en el precio del NFT
    }

    function test_SetPrice() public {
        uint256 newPrice = 0.2 ether;

        // Solo el propietario debe poder establecer el precio.
        vm.startPrank(owner); // Comienza la transacción como el dueño
        talentoTech.setPrice(newPrice); // Establece el nuevo precio
        vm.stopPrank(); // Termina la transacción

        // Verificamos que el precio ha cambiado correctamente
        assertEq(talentoTech.getPrice(), newPrice);
    }

    function test_Withdraw() public {
        uint256 contractBalanceBefore = address(talentoTech).balance;

        // Simulamos una compra
        uint256 tokenId = 1;
        vm.deal(user, 1 ether);
        talentoTech.buyNFT{value: price}(tokenId);

        // Verificamos el balance antes del retiro
        uint256 contractBalanceAfter = address(talentoTech).balance;
        assertEq(contractBalanceAfter, contractBalanceBefore + price);

        // El dueño retira los fondos
        uint256 ownerBalanceBefore = address(owner).balance;

        // Asegúrate de que solo el dueño haga el retiro
        vm.startPrank(owner); // Inicia la transacción como el propietario
        talentoTech.withdraw();
        vm.stopPrank(); // Termina la transacción

        // Verificamos que el balance del propietario haya aumentado
        uint256 ownerBalanceAfter = address(owner).balance;
        assertEq(ownerBalanceAfter, ownerBalanceBefore + price);
    }
}
