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

/**
 * Home page component.
 *
 * Renders the main home page UI.
 * Connects to the user's wallet.
 * Fetches the user's NFTs from the contract.
 * Displays the user's NFTs.
 * Has buttons to claim a Charmander NFT and evolve an NFT.
 */
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
                href="https://github.com/hadeebataj/evolve_pokemon_app/tree/main"
                target="_blank"
                rel="noopener noreferrer"
              >
                Evolving Pokemon NFT
              </a>
            </span>
          </h1>

          <div className={styles.connect}>
            <ConnectWallet />
            <div className={styles.container}>
              <div className={styles.grid}>
                {nfts?.map((nft) => (
                  <div key={nft.metadata.id.toString()} className={styles.card}>
                    <ThirdwebNftMedia metadata={nft.metadata} />
                    <div className={styles.cardText}>
                      <h2 className={styles.gradientText1}>
                        {nft.metadata.name}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.grid} hidden={address ? false : true}>
              <Web3Button
                contractAddress="0x0B9D34297D118Bc3C44bDF9f926850972b71102D"
                action={(contract) => contract?.erc1155.claim(0, 1)}
                type="button"
              >
                Claim a Charmander
              </Web3Button>

              <Web3Button
                contractAddress="0x0B9D34297D118Bc3C44bDF9f926850972b71102D"
                action={(contract) => contract.call("evolve")}
              >
                Evolve
              </Web3Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
