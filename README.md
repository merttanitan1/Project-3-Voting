# Sample Hardhat Project

Bu hardhat projesi basitçe bir oy verme sistemi üzerine kurulu bir solidity diliyle yazılan programdır.

## Kurulum

Projeyi çalıştırmak için aşağıdaki adımları izleyin:

1. Proje klasörünü klonlayın:
```shell
git clone https://github.com/merttanitan1/Project-3-Voting.git
cd Project-3-Voting
```

2. Gerekli bağımlılıkları yükleyin:
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
3. Akıllı kontratı derleyin:
```shell
npx hardhat compile
```

4. Alchemy API ve Etherscan API anahtarlarınızı `.env` dosyasına ekleyin:
API_KEY=YourAlchemyApiKey
PRIVATE_KEY=YourPrivateKey
ETHER_API=YourEtherscanApiKey
