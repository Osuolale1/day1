//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";



// NFT Factory contract for creating NFTs
contract NFTFactory {
    event NFTCreated(address owner, uint256 tokenId);

    function createNFT(address _owner, string memory _tokenURI) external returns (uint256) {
        MyNFT nft = new MyNFT(_owner);
        uint256 tokenId = nft.getTokenId();
        nft.mint(_owner, _tokenURI);
        emit NFTCreated(_owner, tokenId);
        return tokenId;
    }
}

contract MyNFT is ERC721, AccessControl {
    uint256 private _currentTokenId = 0;
    mapping(uint256 => string) private _tokenURIs;

    constructor(address _owner) ERC721("MyNFT", "MNFT") {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    function mint(address _to, string memory _tokenURI) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "MyNFT: must have admin role to mint");
        _currentTokenId++;
        _mint(_to, _currentTokenId);
        _setTokenURI(_currentTokenId, _tokenURI);
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
        _tokenURIs[_tokenId] = _tokenURI;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "MyNFT: URI query for nonexistent token");
        return _tokenURIs[_tokenId];
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

    function getTokenId() external view returns (uint256) {
        return _currentTokenId;
    }
}

// Social media contract integrating authentication, RBAC, and NFT interactions
contract SocialMedia is AccessControl {
    address public admin;
    NFTFactory public nftFactory;

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "SocialMedia: must have admin role");
        _;
    }

    constructor(address _factoryAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        admin = msg.sender;
        nftFactory = NFTFactory(_factoryAddress);
    }

  function createNFT(string memory _tokenURI) public {
    nftFactory.createNFT(msg.sender, _tokenURI);
}

}
