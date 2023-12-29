import { ethers } from "ethers";

// infura  https://mainnet.infura.io/v3/43776aa23c6348ffbd01b2cd90e1220d
// alchemy  https://eth-mainnet.g.alchemy.com/v2/wDQDnpmDAongp03liXmjETNEzlxVraur
// alchemy  wss://eth-mainnet.g.alchemy.com/v2/wDQDnpmDAongp03liXmjETNEzlxVraur
const ALCHEMY_GOERLI_URL = 'wss://opt-mainnet.g.alchemy.com/v2/TKhNVwIgTLYFCQ80aDVXZXERbOU0_Lzz'; //OP主网
const provider = new ethers.WebSocketProvider(ALCHEMY_GOERLI_URL);

//监听区块变化触发
provider.on("block", async (blockNumber) => {
    console.log('当前变化的区块号码是：'+blockNumber);
      // 根据区块号获取交易信息获取
      const block = await provider.getBlock(blockNumber);
      // 获取区块中的交易列表
      const transactions = block.transactions;
      // 获取每笔交易的详细信息
      const transactionPromises = transactions.map((txHash) =>
        provider.getTransaction(txHash)
      );
      const transactionDetails = await Promise.all(transactionPromises);
      // 打印交易信息
      transactionDetails.forEach((tx) => {
        console.log("Transaction Hash:", tx.hash);
        console.log("From:", tx.from);
        console.log("To:", tx.to);
        console.log("Value:",ethers.formatUnits(tx.value,18));//ethers.formatUnits(ethers.getBigInt(tx.value),18)
        console.log("--------------------------");
      });
    console.log("------------------------------------------------------------------------------");
});
