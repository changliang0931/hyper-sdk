import { SM2 } from "gm-ts";
import { ec } from 'elliptic';
import { mnemonicToSeedSync } from 'bip39';

export class HyperWallet {
  keyPair: ec.KeyPair;
  sm2:SM2;
  constructor(privateKey: string) {
    this.sm2 = new SM2();
    this.keyPair = this.sm2.keyFromPrivate(privateKey);
  }

  sign(msg: string) {
    const sig =  this.sm2.sign(Buffer.from(msg,"hex"),this.keyPair);
    return sig.r.toString("hex") + sig.s.toString("hex");
  }

  getPublicKey():string{
      return this.keyPair.getPublic("hex").toString();
  }
}

export function newWalletFromPrivateKey(privateKey:string){
    return new HyperWallet(privateKey);
}

export function newWalletFromMnemonic(mnemonic:string){
    const seed = mnemonicToSeedSync(mnemonic);
    const privateKey = seed.slice(0,32);
    return new HyperWallet(privateKey.toString("hex"));
}