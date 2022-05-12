import { newWalletFromPrivateKey,newWalletFromMnemonic } from '../wallet';
test('My Wallet', () => {
  const wallet1 = newWalletFromPrivateKey('5d1c8c8d5cb3d046d72feebd4877ec85d3514206a9efa14223d9b007c7c1820a');
  const wallet2 = newWalletFromMnemonic('gauge hole clog property soccer idea cycle stadium utility slice hold chief');
  const sig1 = wallet1.sign("aabbccdd");
  const sig2 = wallet2.sign("aabbccdd");
 
});
