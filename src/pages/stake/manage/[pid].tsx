// import { useMemo } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { LiquidityPool as LiquidityPoolList, Stakings } from 'constants/stakingPools'

import { useWeb3NavbarOption } from 'state/web3navbar/hooks'

import LiquidityPool from 'components/App/Staking/LiquidityPool'
import PoolInfo from 'components/App/Staking/PoolInfo'
import PoolShare from 'components/App/Staking/PoolShare'
import AvailableLP from 'components/App/Staking/AvailableLP'
import StakedLP from 'components/App/Staking/LPStaked'
import BalanceToken from 'components/App/Staking/BalanceToken'
import { VStack } from 'components/App/Staking/common/Layout'
import { useMemo } from 'react'

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow: visible;
  margin: 0 auto;
`

const TopWrapper = styled.div<{ isMultipleColumns: boolean }>`
  display: ${({ isMultipleColumns }) => (isMultipleColumns ? 'grid' : 'flex')};
  grid-template-columns: 480px 480px;
  min-width: 480px;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
   display: flex;
    min-width: 460px;
    flex-direction: column;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 340px;
  `}
`

export default function StakingPage() {
  const router = useRouter()
  const { pid } = router.query
  const pidNumber = Number(pid)
  const liquidityPool = LiquidityPoolList.find((pool) => pool.id === pidNumber) || LiquidityPoolList[0]
  const stakingPool = Stakings.find((p) => p.id === liquidityPool.id) || Stakings[0]
  // const poolBalances = usePoolBalances(liquidityPool)

  // const priceToken = liquidityPool.priceToken?.symbol ?? ''
  // //const price = useCustomCoingeckoPrice(priceToken) ?? '0'
  // const deusPrice = useDeusPrice()
  // const deiPrice = useDeiPrice()

  // const totalLockedValue =
  //   poolBalances[1] * 2 * Number(useCustomCoingeckoPrice(liquidityPool.priceToken?.symbol ?? 'DEI'))

  // // generate total APR if pools have secondary APRs
  // const primaryApy = stakingPool.aprHook(stakingPool)
  // const secondaryApy = stakingPool.hasSecondaryApy ? stakingPool.secondaryAprHook(liquidityPool, stakingPool) : 0
  // const totalApy = primaryApy + secondaryApy

  // // generate respective tooltip info if pools have more than 1 reward tokens
  // const primaryTooltipInfo = primaryApy.toFixed(0) + '% ' + stakingPool.rewardTokens[0].symbol
  // const secondaryTooltipInfo = stakingPool.hasSecondaryApy
  //   ? ' + ' + secondaryApy.toFixed(0) + '% ' + stakingPool.rewardTokens[1].symbol
  //   : ''

  // const { totalDepositedAmount } = useUserInfo(stakingPool)

  const isSingleStakingPool = useMemo(() => {
    return stakingPool.isSingleStaking
  }, [stakingPool])

  // const { swapRatio: xDeusRatio } = useVDeusStats()
  // const { swapRatio: bDeiRatio } = useBDeiStats()

  // const totalDepositedValue = useMemo(() => {
  //   return stakingPool.id === 1
  //     ? totalDepositedAmount * bDeiRatio * parseFloat(deiPrice)
  //     : stakingPool.id === 3
  //     ? totalDepositedAmount * xDeusRatio * parseFloat(deusPrice)
  //     : 0
  // }, [bDeiRatio, deiPrice, deusPrice, stakingPool, totalDepositedAmount, xDeusRatio])

  // const toolTipInfo = primaryTooltipInfo + secondaryTooltipInfo

  // function onSelect(pid: number) {
  //   router.push(`/stake/manage/${pid}`)
  // }

  useWeb3NavbarOption({ network: true, wallet: true, stake: true })

  // const items = [
  //   {
  //     name: 'APR',
  //     value: totalApy.toFixed(0) + '%',
  //     hasTooltip: true,
  //     toolTipInfo,
  //   },
  //   { name: 'TVL', value: formatDollarAmount(isSingleStakingPool ? totalDepositedValue : totalLockedValue) },
  //   { name: priceToken + ' Price', value: formatDollarAmount(parseFloat(price)) },
  // ]

  return (
    <Container>
      <TopWrapper isMultipleColumns={!isSingleStakingPool}>
        {!isSingleStakingPool && (
          <VStack style={{ width: '100%' }}>
            <BalanceToken pool={liquidityPool} />
            <LiquidityPool pool={liquidityPool} />
          </VStack>
        )}
        <VStack style={{ width: '100%' }}>
          <AvailableLP pool={liquidityPool} />
          <StakedLP pid={pidNumber} />
          <PoolShare pool={liquidityPool} />
          <PoolInfo pool={liquidityPool} />
          {/* <Reading /> */}
        </VStack>
      </TopWrapper>
    </Container>
  )
}