# ondc-mock-server

### Purpose 

The mock server as name suggested is designed to test mock api's for developers (want to enhance or develop based on API Contracts).

### Tech

- [[node.js](https://nodejs.org/en/)]

## Installation

Make sure node and npm is installed

Clone the ONDC Mock Server repository

```bash
  git clone https://github.com/92shreyansh/ondc-mock-server.git
```

To install dependencies

```shell
  npm install
```

Run the server

```shell
  node app rsf
```


### How we can test

- Import the postman-collection, This collection already has the payload set-up for the each end-point.
- Default this will run on port 5500, you can change this from ``` 
rsf/rsf.yaml```


> The utility validates all the payloads as documented in the [API Contract](https://drive.google.com/file/d/1Z0eT1PZ8_tthEyxli8bLs-B9oCYAZIS0/view).


There are two type of responses we can get for each payload - Sync and Async
1. Sync Response :
 > For sync respone, we should have sync_mode (in respective yaml file for eg : rsf.yaml) as true
 > Also we can set verify_sign as false (in respective yaml file for eg : rsf.yaml) if we dont want to send the signatures in header
 > Url to hit is - http://localhost:5500/receiver_recon
 > It will give response for on_receiver_recon as on_receiver_recon, settle as on_settle and so on.
 > For eg: If we will have payload for receiver_recon as 
 ```json
{
  "context": {
    "ttl": "P2D",
    "city": "*",
    "action": "receiver_recon",
    "bap_id": "abc.buyerapp.com",
    "bpp_id": "receiverapp.com",
    "domain": "ONDC:NTS10",
    "bap_uri": "https://abc.bapuri.com/rsp",
    "bpp_uri": "https://receiverapp.com",
    "country": "IND",
    "timestamp": "2023-04-12T09:45:56.385Z",
    "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
    "core_version": "1.0.0",
    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
  },
  "message": {...}
}
```
 > If schema validates the ouput will be as follows :
```json
 {
    "context": {
        "ttl": "P3D",
        "city": "*",
        "action": "on_receiver_recon",
        "bap_id": "abc.collectorapp.com",
        "bpp_id": "rsf-mock-service.ondc.org",
        "domain": "ONDC:NTS10",
        "bap_uri": "https://abc.bapuri.com/rsp",
        "bpp_uri": "https://rsf-mock-service.ondc.org/",
        "country": "IND",
        "timestamp": "2023-04-11T12:44:56.399Z",
        "message_id": "50a3ee2b-150e-42c4-981e-7601c23499ab",
        "core_version": "1.0.0",
        "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
    },
    "message": {...}
}
```
2. Async Response :
 > For async respone, we should have sync_mode (in respective yaml file for eg : rsf.yaml) as false
 > Also we can set verify_sign as false (in respective yaml file for eg : rsf.yaml) if we dont want to send the signatures in header
> Url to hit is - http://localhost:5500/receiver_recon
 > It will give response as Ack and Nack based upon schema validates or not
 > For eg: If we will have payload for receiver_recon as
 ```json
{
  "context": {
    "ttl": "P2D",
    "city": "*",
    "action": "receiver_recon",
    "bap_id": "abc.buyerapp.com",
    "bpp_id": "receiverapp.com",
    "domain": "ONDC:NTS10",
    "bap_uri": "https://abc.bapuri.com/rsp",
    "bpp_uri": "https://receiverapp.com",
    "country": "IND",
    "timestamp": "2023-04-12T09:45:56.385Z",
    "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
    "core_version": "1.0.0",
    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
  },
  "message": {...}
}
```
 > If schema validates the ouput will be as follows :
```json
 {
    "message": {
        "ack": {
            "status": "ACK"
        }
    }
}
```     
in async mode you will receive a callback at your bapuri/on_method as response

3. Use case :
  1) Collector will do /settle -> /on_settle , /receiver_recon -> on_receiver_recon deployed_url =  https://rsf-mock-service.ondc.org/settle , https://rsf-mock-service.ondc.org/receiver_recon
  2) Receiver will do /push_receiver_recon to receive /receiver_recon on the bap_uri provided in payload deployed_url https://rsf-mock-service.ondc.org/push_receiver_recon

