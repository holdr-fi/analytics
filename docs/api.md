# API Endpoints

## Get number of pools

```
GET https://api.holdr.fi/analytics-mumbai/pools/poolcount
```

### Return values
| Name | Type | Description |
|---|---|---|
|poolCount|number|Number of pools|

## Get number of liquidity providers (LPs)

```
GET https://api.holdr.fi/analytics-mumbai/pools/lpcount
```

### Return values
| Name | Type | Description |
|---|---|---|
|lpCount|number|Number of liquidity providers|

## Get total volume locked (TVL)

```
GET https://api.holdr.fi/analytics-mumbai/pools/tvl
```

### Return values
| Name | Type | Description |
|---|---|---|
|tvl|number|Total USD value of all pool liquidity|

## Get HLDR tokenholder count

```
GET https://api.holdr.fi/analytics-mumbai/governance/tokenholders
```

### Return values
| Name | Type | Description |
|---|---|---|
|tokenholderCount|number|Number of HLDR tokenholders|

## Get HLDR tokens minted
```
GET https://api.holdr.fi/analytics-mumbai/governance/tokensminted
```

### Return values
| Name | Type | Description |
|---|---|---|
|tokensMinted|number|HLDR total supply|

## Get count of addresses that are both HLDR tokenholders and a liquidity provider for a HLDR pool
```
GET https://api.holdr.fi/analytics-mumbai/governance/tokenholdersandlp
```

### Return values
| Name | Type | Description |
|---|---|---|
|tokenholdersAndLP|number|Number of addresses that are both HLDR tokenholders and HLDR liquidity providers|

## Get HLDR swap volume in USD for last 24 hours.
```
GET https://api.holdr.fi/analytics-mumbai/exchange/24hvolume
```

### Return values
| Name | Type | Description |
|---|---|---|
|24hvolume|number|Swap volume in USD for last 24H|

## Get HLDR swap volume in USD for last 7 days.
```
GET https://api.holdr.fi/analytics-mumbai/exchange/7dvolume
```

### Return values
| Name | Type | Description |
|---|---|---|
|7dvolume|number|Swap volume in USD for last 7 days|

## Get total supply of veHLDR
```
GET https://api.holdr.fi/analytics-mumbai/vehldr/totalvehldr
```

### Return values
| Name | Type | Description |
|---|---|---|
|totalVEHldr|number|Current veHLDR total supply|

## Get total supply of 80-HLDR-20-WETH HPT
```
GET https://api.holdr.fi/analytics-mumbai/vehldr/totalhpt
```

### Return values
| Name | Type | Description |
|---|---|---|
|totalHPT|number|Current 80-Holdr-20-WETH HPT total supply|

## Get total number of locked 80-HLDR-20-WETH HPT
```
GET https://api.holdr.fi/analytics-mumbai/vehldr/lockedhpt
```

### Return values
| Name | Type | Description |
|---|---|---|
|lockedHPT|number|Current amount of 80-HLDR-20-WETH HPT that is locked in the votingEscrow contract|

## Get average lock time of locked 
```
GET https://api.holdr.fi/analytics-mumbai/vehldr/locktime
```

### Return values
| Name | Type | Description |
|---|---|---|
|lockedHPT|number|Average lock time of locked 80-HLDR-20-WETH HPT, in seconds|

## Get percentage of 80-HLDR-20-WETH HPT that is locked in VotingEscrow contract.
```
GET https://api.holdr.fi/analytics-mumbai/vehldr/percentagehptlocked
```

### Return values
| Name | Type | Description |
|---|---|---|
|lockedHPT|number|Percentage of 80-HLDR-20-WETH HPT that is locked, in decimal format (i.e. 20% = 0.2)