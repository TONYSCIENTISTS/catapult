"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { clusterApiUrl } from "@solana/web3.js";

interface NFT {
  publicKey: string;
  metadata: {
    name: string;
    symbol: string;
    uri: string;
  };
}

interface Window98NFTFetcherProps {
  onClose: () => void;
}

export default function Window98NFTFetcher({ onClose }: Window98NFTFetcherProps) {
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFTs() {
      if (!publicKey) {
        setLoading(false);
        return;
      }
      try {
        // Allow BigInt to be serialized as strings
        BigInt.prototype.toJSON = function () {
          return this.toString();
        };
        const umi = createUmi(clusterApiUrl("devnet"));
        const allNFTs = await fetchAllDigitalAssetWithTokenByOwner(umi, publicKey);
        const mappedNFTs: NFT[] = allNFTs.map((nft) => ({
          publicKey: nft.publicKey.toString(),
          metadata: {
            name: nft.metadata.name,
            symbol: nft.metadata.symbol,
            uri: nft.metadata.uri,
          },
        }));
        setNfts(mappedNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
      setLoading(false);
    }
    fetchNFTs();
  }, [publicKey]);

  return (
    <div className="nft-fetcher" onClick={(e) => e.stopPropagation()}>
      <h3>NFTs in Wallet</h3>
      {loading ? (
        <p>Loading NFTs...</p>
      ) : nfts.length > 0 ? (
        <div className="nft-list">
          {nfts.map((nft, idx) => (
            <div key={idx} className="nft-item">
              <img src={nft.metadata.uri} alt={nft.metadata.name} />
              <p>{nft.metadata.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found.</p>
      )}
      <style jsx>{`
        .nft-fetcher {
          padding: 8px;
          font-family: "MS Sans Serif", sans-serif;
          color: #000;
        }
        .nft-fetcher h3 {
          margin: 0 0 8px;
          font-size: 16px;
          text-align: center;
        }
        .nft-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .nft-item {
          width: 100px;
          text-align: center;
        }
        .nft-item img {
          width: 100%;
          height: auto;
          border: 1px solid #000;
          box-shadow: 1px 1px 0px #fff, inset -1px -1px 0px #000;
        }
      `}</style>
    </div>
  );
}
