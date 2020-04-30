const abiCoder = require('web3-eth-abi');
import { RawLogEntry } from 'ethereum-types';
import { ERC20BridgeTransferEvent } from '../../entities';
import { parseEvent } from './parse_event';
import { ERC20_BRIDGE_TRADE_ABI } from '../../constants';
import { BigNumber } from '@0x/utils';

export function parseErc20BridgeTransfer(eventLog: RawLogEntry): ERC20BridgeTransferEvent {
    const eRC20BridgeTransferEvent = new ERC20BridgeTransferEvent();

    parseEvent(eventLog, eRC20BridgeTransferEvent);

    const decodedLog = abiCoder.decodeLog(ERC20_BRIDGE_TRADE_ABI.inputs, eventLog.data);

    eRC20BridgeTransferEvent.fromToken = decodedLog.fromToken.toLowerCase();
    eRC20BridgeTransferEvent.toToken = decodedLog.toToken.toLowerCase();
    eRC20BridgeTransferEvent.fromTokenAmount = new BigNumber(decodedLog.fromTokenAmount);
    eRC20BridgeTransferEvent.toTokenAmount = new BigNumber(decodedLog.toTokenAmount);
    eRC20BridgeTransferEvent.from = decodedLog.from.toLowerCase();
    eRC20BridgeTransferEvent.to = decodedLog.to.toLowerCase();

    return eRC20BridgeTransferEvent;
}