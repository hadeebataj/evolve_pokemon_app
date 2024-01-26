import {
  ConnectWallet,
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { contract } = useContract(
    "0x0B9D34297D118Bc3C44bDF9f926850972b71102D"
  );

  const address = useAddress();

  const { data: nfts } = useOwnedNFTs(contract, address);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <span className={styles.gradientText0}>
              <a
                href="https://thirdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Evolving Pokemon NFT
              </a>
            </span>
          </h1>

          <div className={styles.connect}>
            <ConnectWallet />
            <hr />
            {nfts?.map((nft) => (
              <div key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia metadata={nft.metadata} />
                {nft.metadata.name}
              </div>
            ))}
            <hr />
            <Web3Button
              contractAddress="0x0B9D34297D118Bc3C44bDF9f926850972b71102D"
              action={(contract) => contract?.erc1155.claim(0, 1)}
              type="button"
            >
              Claim a Charmander
            </Web3Button>
            <hr />
            <Web3Button
              contractAddress="0x0B9D34297D118Bc3C44bDF9f926850972b71102D"
              action={(contract) => contract.call("evolve")}
            >
              Evolve
            </Web3Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
