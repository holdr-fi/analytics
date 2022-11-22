# API Endpoints

## Get LBP time remaining

```
GET https://api.holdr.fi/lbp/time
```

### Return values
| Name | Type | Description |
|---|---|---|
|endTime|number|Unix timestamp of LBP end|

## Get current LBP price

```
GET https://api.holdr.fi/lbp/price
```

### Return values
| Name | Type | Description |
|---|---|---|
|price|number|Current LBP price in USD for HLDR|


## Get historical LBP prices

```
GET https://api.holdr.fi/lbp/priceHistory
```

### Return values
| Name | Type | Description |
|---|---|---|
|prices|[string, number][]|Historical price data for HLDR in LBP|

### Example Response 

```
[
  [ '2022/10/09 20:00', 0 ],
  [ '2022/10/09 21:00', 0 ],
  [ '2022/10/09 22:00', 1895100.5864359343 ],
  [ '2022/10/09 23:00', 1826122.3931106932 ],
  [ '2022/10/10 00:00', 1848083.9410550017 ],
  [ '2022/10/10 01:00', 1822226.504218339 ],
  [ '2022/10/10 02:01', 1854989.0334787413 ],
  [ '2022/10/10 03:01', 1769579.465275322 ],
  [ '2022/10/10 04:01', 1762728.9838122786 ],
  [ '2022/10/10 05:01', 1764858.8175566338 ]
]
```

## Get HLDR tokens remaining for LBP

```
GET https://api.holdr.fi/lbp/tokensRemaining
```

### Return values
| Name | Type | Description |
|---|---|---|
|tokens|number|Number of HLDR tokens remaining in LBP pool|