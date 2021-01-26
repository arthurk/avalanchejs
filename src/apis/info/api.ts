/**
 * @packageDocumentation
 * @module API-Info
 */
import AvalancheCore from "../../avalanche";
import { JRPCAPI } from "../../common/jrpcapi";
import { RequestResponseData } from "../../common/apibase";
import BN from "bn.js";
import { 
  iGetBlockchainIDParams, 
  iGetTxFeeResponse, 
  iIsBootstrappedParams ,
  iPeer
} from "./interfaces";

/**
 * Class for interacting with a node's InfoAPI.
 *
 * @category RPCAPIs
 *
 * @remarks This extends the [[JRPCAPI]] class. This class should not be directly called. Instead, use the [[Avalanche.addAPI]] function to register this interface with Avalanche.
 */
export class InfoAPI extends JRPCAPI {
  /**
   * Fetches the blockchainID from the node for a given alias.
   *
   * @param alias The blockchain alias to get the blockchainID
   *
   * @returns Returns a Promise<string> containing the base 58 string representation of the blockchainID.
   */
  getBlockchainID = async (alias: string): Promise<string> => {
    const params: iGetBlockchainIDParams = {
      alias,
    };
    const response: RequestResponseData = await this.callMethod("info.getBlockchainID", params);
    return response.data.result.blockchainID;
  };

  /**
   * Fetches the networkID from the node.
   *
   * @returns Returns a Promise<number> of the networkID.
   */
  getNetworkID = async (): Promise<number> => {
    const params: any = {};
    const response: RequestResponseData = await this.callMethod("info.getNetworkID", params);
    return response.data.result.networkID;
  };

  /**
   * Fetches the network name this node is running on
   *
   * @returns Returns a Promise<string> containing the network name.
   */
  getNetworkName = async (): Promise<string> => {
    const response: RequestResponseData = await this.callMethod("info.getNetworkName");
    return response.data.result.networkName;
  }

  /**
   * Fetches the nodeID from the node.
   *
   * @returns Returns a Promise<string> of the nodeID.
   */
  getNodeID = async (): Promise<string> => {
    const response: RequestResponseData = await this.callMethod("info.getNodeID");
    return response.data.result.nodeID;
  };

  /**
   * Fetches the nodeIP from the node.
   *
   * @returns Returns a Promise<string> of the nodeID.
   */
  getNodeIP = async (): Promise<string> => {
    const response: RequestResponseData = await this.callMethod("info.getNodeIP");
    return response.data.result.ip;
  };

  /**
   * Fetches the version of Gecko this node is running
   *
   * @returns Returns a Promise<string> containing the version of Gecko.
   */
  getNodeVersion = async (): Promise<string> => {
    const response: RequestResponseData = await this.callMethod("info.getNodeVersion");
    return response.data.result.version;
  }

  /**
   * Fetches the transaction fee from the node.
   *
   * @returns Returns a Promise<iGetTxFeeResponse> with both txFee and creationTxFee in nAVAX.
   */
  getTxFee = async (): Promise<iGetTxFeeResponse> => {
    const response: RequestResponseData = await this.callMethod("info.getTxFee");
    return {
      txFee: new BN(response.data.result.txFee, 10),
      creationTxFee: new BN(response.data.result.creationTxFee, 10)
    }
  };

  /**
   * Check whether a given chain is done bootstrapping
   * @param chain The ID or alias of a chain.
   *
   * @returns Returns a Promise<boolean> of whether the chain has completed bootstrapping.
   */
  isBootstrapped = async (chain: string): Promise<boolean> => {
    const params: iIsBootstrappedParams = {
      chain
    };
    const response: RequestResponseData = await this.callMethod("info.isBootstrapped", params);
    return response.data.result.isBootstrapped;
  };

  /**
   * Returns the peers connected to the node.
   *
   * @returns Promise for the list of connected peers in <ip>:<port> format.
   */
  peers = async (): Promise<iPeer[]> => {
    const response: RequestResponseData = await this.callMethod("info.peers");
    return response.data.result.peers;
  } 

  constructor(core: AvalancheCore, baseurl: string = "/ext/info") { super(core, baseurl); }
}
