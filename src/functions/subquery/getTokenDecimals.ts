import { POOL_SUBGRAPH } from '../../constants';
import { SubgraphClient } from '../../utils';
const subgraphClient = new SubgraphClient(POOL_SUBGRAPH);

export const getTokenDecimals = async function getTokenDecimals(): Promise<Map<string, number>> {
  const args = {
    orderDirection: 'asc',
  };

  const attrs = {
    decimals: true,
    address: true,
  };

  const query = {
    poolTokens: {
      __args: args,
      ...attrs,
    },
  };

  const data = await subgraphClient.get(query);

  const tokenToDecimals = data?.poolTokens.reduce((runningtokenToDecimals, tokenInfo) => {
    runningtokenToDecimals.set(tokenInfo?.address, tokenInfo?.decimals);
    return runningtokenToDecimals;
  }, new Map<string, number>());

  return tokenToDecimals;
};
