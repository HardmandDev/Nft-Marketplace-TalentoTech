// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract TalentoTech is ERC721, Ownable2Step {
    string private constant BASE_URI =
        "https://black-capitalist-swan-487.mypinata.cloud/ipfs/QmXgCjHNjVadHdFsWo6yGcdixF2aUsHuUubVLBqFMVVdfE/";

    uint256 private _nextTokenId;
    uint256 public price;
    mapping(uint256 => address) private _buyers;

    // NFTs que su dueño actual ha puesto en venta
    mapping(uint256 => bool) private _listed;

    // Ether de ventas pendiente de retirar por cada vendedor
    mapping(address => uint256) private _proceeds;

    // Evento de compra de NFT
    event NFTBought(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price
    );
    event ListingUpdated(uint256 indexed tokenId, bool listed);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event Withdrawn(address indexed account, uint256 amount);

    constructor(
        address initialOwner,
        uint256 initialPrice
    )
        ERC721("TalentoTech", "NFTTT")
        Ownable(initialOwner)
    {
        require(initialPrice > 0, "El precio debe ser mayor que 0");
        price = initialPrice;
    }

    // Función para mintear un NFT. Queda en venta desde el inicio.
    function mint() public onlyOwner {
        _nextTokenId++;
        uint256 tokenId = _nextTokenId;
        _listed[tokenId] = true;
        emit ListingUpdated(tokenId, true);
        _safeMint(msg.sender, tokenId);
    }

    // El dueño de un NFT lo pone en venta o lo retira de la venta
    function setListed(uint256 tokenId, bool listed) public {
        require(ownerOf(tokenId) == msg.sender, "Solo el duenio puede listar el NFT");
        _listed[tokenId] = listed;
        emit ListingUpdated(tokenId, listed);
    }

    // Función para comprar NFT. El pago queda disponible para el vendedor en withdraw().
    function buyNFT(uint256 tokenId) public payable {
        address seller = ownerOf(tokenId); // revierte si el NFT no existe
        require(_listed[tokenId], "El NFT no esta en venta");
        require(seller != msg.sender, "No puedes comprar tu propio NFT");
        require(msg.value == price, "Debes enviar exactamente el precio");

        _buyers[tokenId] = msg.sender;
        _proceeds[seller] += msg.value;

        // _update (más abajo) retira el NFT de la venta al transferirlo
        _transfer(seller, msg.sender, tokenId);

        emit NFTBought(msg.sender, tokenId, msg.value);
    }

    // Función para establecer el precio de los NFTs (solo el propietario puede cambiarlo)
    function setPrice(uint256 newPrice) public onlyOwner {
        require(newPrice > 0, "El precio debe ser mayor que 0");
        emit PriceUpdated(price, newPrice);
        price = newPrice;
    }

    // Función que retorna la URL del NFT con la estructura base
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        return string.concat(BASE_URI, Strings.toString(tokenId), ".json");
    }

    // Último comprador de un NFT
    function getBuyer(uint256 tokenId) public view returns (address) {
        return _buyers[tokenId];
    }

    // Función para obtener el precio de un NFT
    function getPrice() public view returns (uint256) {
        return price;
    }

    function isListed(uint256 tokenId) public view returns (bool) {
        return _listed[tokenId];
    }

    function proceedsOf(address account) public view returns (uint256) {
        return _proceeds[account];
    }

    // Cada vendedor (incluido el propietario del contrato) retira el Ether de sus ventas
    function withdraw() public {
        uint256 amount = _proceeds[msg.sender];
        require(amount > 0, "No hay fondos para retirar");
        _proceeds[msg.sender] = 0;
        emit Withdrawn(msg.sender, amount);
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        require(ok, "Fallo el envio de Ether");
    }

    // Cualquier transferencia (compra o transferFrom) retira el NFT de la venta
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = super._update(to, tokenId, auth);
        if (from != address(0) && _listed[tokenId]) {
            _listed[tokenId] = false;
            emit ListingUpdated(tokenId, false);
        }
        return from;
    }
}
