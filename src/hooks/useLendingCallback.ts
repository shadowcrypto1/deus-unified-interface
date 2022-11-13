import { useCallback, useMemo } from 'react'
import { TransactionResponse } from '@ethersproject/abstract-provider'

import useWeb3React from './useWeb3'
import { useFujinManagerContract } from './useContract'

import { useTransactionAdder } from 'state/transactions/hooks'
import { CollateralPoolErrorToUserReadableMessage } from 'utils/parseError'
import { calculateGasMargin, TransactionCallbackState } from 'utils/web3'
import toast from 'react-hot-toast'

export function useLendingCallback(
  name: string,
  rateContract: string,
  capManager: string,
  immutables: string,
  liquidationFee: string,
  isBorrowerWhitelistActive: boolean,
  isLenderWhitelistActive: boolean
): {
  state: TransactionCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { account, chainId, library } = useWeb3React()
  const addTransaction = useTransactionAdder()
  const fujinManagerContract = useFujinManagerContract()

  const constructCall = useCallback(() => {
    try {
      if (
        !account ||
        !library ||
        !fujinManagerContract ||
        !name ||
        !rateContract ||
        !capManager ||
        !immutables ||
        !liquidationFee
      ) {
        throw new Error('Missing dependencies.')
      }

      const args = [
        name,
        rateContract,
        capManager,
        immutables,
        liquidationFee,
        isBorrowerWhitelistActive,
        isLenderWhitelistActive,
      ]

      return {
        address: fujinManagerContract.address,
        calldata: fujinManagerContract.interface.encodeFunctionData('deployLending', args) ?? '',
        value: 0,
      }
    } catch (error) {
      return {
        error,
      }
    }
  }, [
    account,
    library,
    fujinManagerContract,
    name,
    rateContract,
    capManager,
    immutables,
    liquidationFee,
    isBorrowerWhitelistActive,
    isLenderWhitelistActive,
  ])

  return useMemo(() => {
    if (!account || !chainId || !library || !fujinManagerContract) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      }
    }
    if (!name || !rateContract || !capManager || !immutables || !liquidationFee) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: 'Missing inputs',
      }
    }

    return {
      state: TransactionCallbackState.VALID,
      error: null,
      callback: async function onCreate(): Promise<string> {
        console.log('onCreate callback')
        const call = constructCall()
        const { address, calldata, value } = call

        if ('error' in call) {
          console.error(call.error)
          if (call.error.message) {
            throw new Error(call.error.message)
          } else {
            throw new Error('Unexpected error. Could not construct calldata.')
          }
        }

        const tx = !value
          ? { from: account, to: address, data: calldata }
          : { from: account, to: address, data: calldata, value }

        console.log('CREATE LENDING POOL TRANSACTION', { tx, value })

        const estimatedGas = await library.estimateGas(tx).catch((gasError) => {
          console.debug('Gas estimate failed, trying eth_call to extract error', call)

          return library
            .call(tx)
            .then((result) => {
              console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
              return {
                error: new Error('Unexpected issue with estimating the gas. Please try again.'),
              }
            })
            .catch((callError) => {
              console.debug('Call threw an error', call, callError)
              toast.error(CollateralPoolErrorToUserReadableMessage(callError))
              return {
                error: new Error(callError.message),
              }
            })
        })

        if ('error' in estimatedGas) {
          throw new Error('Unexpected error. Could not estimate gas for this transaction.')
        }

        return library
          .getSigner()
          .sendTransaction({
            ...tx,
            ...(estimatedGas ? { gasLimit: calculateGasMargin(estimatedGas) } : {}),
            // gasPrice /// TODO add gasPrice based on EIP 1559
          })
          .then((response: TransactionResponse) => {
            console.log(response)
            const summary = `Create ${name} pool`
            addTransaction(response, { summary })

            return response.hash
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Transaction failed`, error, address, calldata, value)
              throw new Error(`Transaction failed: ${error.message}`)
            }
          })
      },
    }
  }, [
    account,
    chainId,
    library,
    fujinManagerContract,
    name,
    rateContract,
    capManager,
    immutables,
    liquidationFee,
    constructCall,
    addTransaction,
  ])
}

export function useAssetsCallback(
  fraxlendPairCore: string,
  tokens: string[],
  oracles: string[]
): {
  state: TransactionCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { account, chainId, library } = useWeb3React()
  const addTransaction = useTransactionAdder()
  const tokenManagerContract = useFujinManagerContract()

  const constructCall = useCallback(() => {
    try {
      if (!account || !library || !tokenManagerContract || !fraxlendPairCore || !tokens || !oracles) {
        throw new Error('Missing dependencies.')
      }

      const args = [fraxlendPairCore, tokens, oracles]

      return {
        address: tokenManagerContract.address,
        calldata: tokenManagerContract.interface.encodeFunctionData('defineLendingAssets', args) ?? '',
        value: 0,
      }
    } catch (error) {
      return {
        error,
      }
    }
  }, [account, library, tokenManagerContract, fraxlendPairCore, tokens, oracles])

  return useMemo(() => {
    if (!account || !chainId || !library || !tokenManagerContract) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      }
    }
    if (!fraxlendPairCore || !tokens || !oracles) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: 'Missing inputs',
      }
    }

    return {
      state: TransactionCallbackState.VALID,
      error: null,
      callback: async function onCreate(): Promise<string> {
        console.log('onCreate callback')
        const call = constructCall()
        const { address, calldata, value } = call

        if ('error' in call) {
          console.error(call.error)
          if (call.error.message) {
            throw new Error(call.error.message)
          } else {
            throw new Error('Unexpected error. Could not construct calldata.')
          }
        }

        const tx = !value
          ? { from: account, to: address, data: calldata }
          : { from: account, to: address, data: calldata, value }

        console.log('DEFINE ASSETS POOL TRANSACTION', { tx, value })

        const estimatedGas = await library.estimateGas(tx).catch((gasError) => {
          console.debug('Gas estimate failed, trying eth_call to extract error', call)

          return library
            .call(tx)
            .then((result) => {
              console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
              return {
                error: new Error('Unexpected issue with estimating the gas. Please try again.'),
              }
            })
            .catch((callError) => {
              console.debug('Call threw an error', call, callError)
              toast.error(CollateralPoolErrorToUserReadableMessage(callError))
              return {
                error: new Error(callError.message),
              }
            })
        })

        if ('error' in estimatedGas) {
          throw new Error('Unexpected error. Could not estimate gas for this transaction.')
        }

        return library
          .getSigner()
          .sendTransaction({
            ...tx,
            ...(estimatedGas ? { gasLimit: calculateGasMargin(estimatedGas) } : {}),
            // gasPrice /// TODO add gasPrice based on EIP 1559
          })
          .then((response: TransactionResponse) => {
            console.log(response)
            const summary = `Define Assets for pool ${fraxlendPairCore}`
            addTransaction(response, { summary })

            return response.hash
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Transaction failed`, error, address, calldata, value)
              throw new Error(`Transaction failed: ${error.message}`)
            }
          })
      },
    }
  }, [
    account,
    chainId,
    library,
    tokenManagerContract,
    fraxlendPairCore,
    tokens,
    oracles,
    constructCall,
    addTransaction,
  ])
}

export function useCollateralsCallback(
  fraxlendPairCore: string,
  tokens: string[],
  oracles: string[],
  ltvs: number[]
): {
  state: TransactionCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { account, chainId, library } = useWeb3React()
  const addTransaction = useTransactionAdder()
  const tokenManagerContract = useFujinManagerContract()

  const constructCall = useCallback(() => {
    try {
      if (!account || !library || !tokenManagerContract || !fraxlendPairCore || !tokens || !oracles || !ltvs) {
        throw new Error('Missing dependencies.')
      }

      const args = [fraxlendPairCore, tokens, oracles, ltvs]

      return {
        address: tokenManagerContract.address,
        calldata: tokenManagerContract.interface.encodeFunctionData('defineLendingCollaterals', args) ?? '',
        value: 0,
      }
    } catch (error) {
      return {
        error,
      }
    }
  }, [account, library, tokenManagerContract, fraxlendPairCore, tokens, oracles, ltvs])

  return useMemo(() => {
    if (!account || !chainId || !library || !tokenManagerContract) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      }
    }
    if (!fraxlendPairCore || !tokens || !oracles || !ltvs) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: 'Missing inputs',
      }
    }

    return {
      state: TransactionCallbackState.VALID,
      error: null,
      callback: async function onCreate(): Promise<string> {
        console.log('onCreate callback')
        const call = constructCall()
        const { address, calldata, value } = call

        if ('error' in call) {
          console.error(call.error)
          if (call.error.message) {
            throw new Error(call.error.message)
          } else {
            throw new Error('Unexpected error. Could not construct calldata.')
          }
        }

        const tx = !value
          ? { from: account, to: address, data: calldata }
          : { from: account, to: address, data: calldata, value }

        console.log('DEFINE COLLATERALS POOL TRANSACTION', { tx, value })

        const estimatedGas = await library.estimateGas(tx).catch((gasError) => {
          console.debug('Gas estimate failed, trying eth_call to extract error', call)

          return library
            .call(tx)
            .then((result) => {
              console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
              return {
                error: new Error('Unexpected issue with estimating the gas. Please try again.'),
              }
            })
            .catch((callError) => {
              console.debug('Call threw an error', call, callError)
              toast.error(CollateralPoolErrorToUserReadableMessage(callError))
              return {
                error: new Error(callError.message),
              }
            })
        })

        if ('error' in estimatedGas) {
          throw new Error('Unexpected error. Could not estimate gas for this transaction.')
        }

        return library
          .getSigner()
          .sendTransaction({
            ...tx,
            ...(estimatedGas ? { gasLimit: calculateGasMargin(estimatedGas) } : {}),
            // gasPrice /// TODO add gasPrice based on EIP 1559
          })
          .then((response: TransactionResponse) => {
            console.log(response)
            const summary = `Define Collaterals for pool ${fraxlendPairCore}`
            addTransaction(response, { summary })

            return response.hash
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Transaction failed`, error, address, calldata, value)
              throw new Error(`Transaction failed: ${error.message}`)
            }
          })
      },
    }
  }, [
    account,
    chainId,
    library,
    tokenManagerContract,
    fraxlendPairCore,
    tokens,
    oracles,
    ltvs,
    constructCall,
    addTransaction,
  ])
}
