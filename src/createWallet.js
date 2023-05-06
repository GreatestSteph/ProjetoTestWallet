//aqui esta sendo criado um endereço de teste

// importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')


// define a rede
// bitcoin é a rede principal
// testnet é a rede de teste
const network = bitcoin.networks.testnet


// a derivação de endereços, carteiras HD
// o 1 do meio indica testnet
// se o meio for 0 indica main net (rede principal)
const path = "m/49'/1'/0'/0"


// criando palavras para a seed, cria-se o mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)


//cria-se a raiz da carteira HD
let root = bip32.fromSeed(seed, network)


//cria-se uma conta para pvtkeys e pubkeys
let account = root.derivePath(path)
//gera uma conta carteira nó filho a partir de uma carteira nó raiz, que deriva outros nós
let node = account.derive(0).derive(0)


//gera um endereço, o endereço usado é: pay to p2pkh
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address


//escreve os dados que foram gerados na carteira
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
//node.towif permite formatar a chave 
//para que esta possa ser importada dentro de um software gerador de carteiras
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)

//se "node. /createWallet.js" não funcionar é porque você não salvou esse arquivo, então o faça :D




