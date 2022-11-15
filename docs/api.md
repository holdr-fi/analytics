# API Endpoints

## Get LBP time remaining

```
GET https://api.holdr.fi/lbp/time
```

### Return values
| Name | Type | Description |
|---|---|---|
|endTime|number|Unix timestamp of LBP end|

## Get current LBP prices

```
GET https://api.holdr.fi/lbp/price
```

### Return values
| Name | Type | Description |
|---|---|---|
|price|number|Current price of LBP pool to obtain new assets|