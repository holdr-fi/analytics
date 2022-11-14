# API Endpoints

## Get LBP time remaining

```
GET https://api.holdr.fi/lbp/time
```

### Return values
| Name | Type | Description |
|---|---|---|
|time|number|Remaining time (in seconds) for LBP|

## Get current LBP prices

```
GET https://api.holdr.fi/lbp/price
```

### Return values
| Name | Type | Description |
|---|---|---|
|lbpPrices|SwapInfo[]|Two-element array containing information about swapping either way through LBP pool|

### SwapInfo types

```js
type SwapInfo = {
  description: string;
  tokenIn: string;
  tokenOut: string;
  decimalsIn: number;
  decimalsOut: number;
  rate: number; // For 1 of tokenIn (adjusted for decimals), how much tokenOut do we get?
};
```

### Example response

```bash
[
  {
    description: 'ETH to HLDR',
    tokenIn: '0x0Ab2e51763E84c5473C8001b39F745dfE8d4f9f9',
    tokenOut: '0x76e6Ab0F386A8Fcd727DcA6ce5C266D651458590',
    decimalsIn: 18,
    decimalsOut: 18,
    rate: 0.00051284349507
  },
  {
    description: 'HLDR to ETH',
    tokenIn: '0x76e6Ab0F386A8Fcd727DcA6ce5C266D651458590',
    tokenOut: '0x0Ab2e51763E84c5473C8001b39F745dfE8d4f9f9',
    decimalsIn: 18,
    decimalsOut: 18,
    rate: 1892.122022031052
  }
]
```