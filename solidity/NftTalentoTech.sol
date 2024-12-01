// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TalentoTech is ERC721, Ownable {
    using SafeMath for uint256; // Para evitar overflow

    uint256 private _nextTokenId;
    uint256 public price; // Precio de los NFTs
    mapping(uint256 => address) private _buyers; // Mapeo para guardar el historial de compradores

    // Evento de compra de NFT
    event NFTBought(address indexed buyer, uint256 indexed tokenId, uint256 price);

    constructor(address initialOwner, uint256 initialPrice)
        ERC721("TalentoTech", "NFTTT")
        Ownable(initialOwner)
    {
        transferOwnership(initialOwner); // Establecer el dueño inicial
        price = initialPrice; // Establecer precio inicial
    }

    // Función para mintiar un NFT
    function mint() public onlyOwner {
        _nextTokenId++;
        _mint(msg.sender, _nextTokenId);
    }

    // Función para comprar NFT
    function buyNFT(uint256 tokenId) public payable {
        require(msg.value >= price, "No has enviado suficiente Ether");
        require(ownerOf(tokenId) != address(0), "NFT no existe"); // Usamos ownerOf para verificar existencia
        require(ownerOf(tokenId) != msg.sender, "No puedes comprar tu propio NFT");

        // Registrar al comprador
        _buyers[tokenId] = msg.sender;

        // Transferir el NFT al comprador
        _safeTransfer(ownerOf(tokenId), msg.sender, tokenId, "");

        // Emitir evento de compra
        emit NFTBought(msg.sender, tokenId, msg.value);
    }

    // Función para establecer el precio de un NFT (solo el propietario puede cambiarlo)
    function setPrice(uint256 newPrice) public onlyOwner {
        price = newPrice;
    }

    // Función que retorna la URL del NFT con la estructura base
    function tokenURI(uint256 tokenId) public pure virtual override returns (string memory) {
        return string(
            abi.encodePacked("https://black-capitalist-swan-487.mypinata.cloud/ipfs/QmXgCjHNjVadHdFsWo6yGcdixF2aUsHuUubVLBqFMVVdfE/", 
            Strings.toString(tokenId), ".json")
        );
    }

    // Función para obtener el historial de compras de un NFT
    function getBuyer(uint256 tokenId) public view returns (address) {
        return _buyers[tokenId];
    }

    // Función para obtener el precio de un NFT
    function getPrice() public view returns (uint256) {
        return price;
    }

    // Función para retirar el Ether acumulado por las ventas
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}