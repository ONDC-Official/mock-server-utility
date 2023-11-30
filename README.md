# ondc-mock-server-utility

### Purpose

The ONDC Mock Server is a tool specifically designed to test ONDC APIs, based on the model implementation by ONDC.

### Technologies Used

- [[node.js](https://nodejs.org/en/)]

## Installation (Local Server)

Ensure that Node.js and npm are installed on your system.

> Clone the ONDC Mock Server repository

```bash
git  clone  https://github.com/ONDC-Official/mock-server-utility.git
```

> Install dependencies

```shell
npm  install
```

> Run the server

```shell
node  app  rsf
```

## How to test

- Import the provided Postman collection located at the root folder. This collection is pre-configured with payloads for each endpoint.
- By default, the server runs on port 5500, but you can modify this in `rsf/rsf.yaml`.
- The utility validates payloads according to the model implementation by ONDC.

### Synchronous Response (Sync Mode):

- To receive a synchronous response:
  - Set sync_mode to true in the respective YAML file (e.g., rsf.yaml).
  - Optionally, set verify_sign to false in the YAML file if signatures in the header are not required.
  - Hit the URL: http://localhost:5500/receiver_recon
  - The response will be in the format specified in the example.

### Example

Request

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
   "bpp_uri": "https://rsf-mock-service.ondc.org/",
   "country": "IND",
   "timestamp": "2023-04-12T09:45:56.385Z",
   "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
   "core_version": "1.0.0",
   "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
 },
 "message": {...}
}
```

Response

```json
 {
 "context": {
   "ttl": "P2D",
   "city": "*",
   "action": "on_receiver_recon",
   "bap_id": "abc.buyerapp.com",
   "bpp_id": "receiverapp.com",
   "domain": "ONDC:NTS10",
   "bap_uri": "https://abc.bapuri.com/rsp",
   "bpp_uri": "https://rsf-mock-service.ondc.org/",
   "country": "IND",
   "timestamp": "2023-04-12T09:45:56.385Z",
   "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
   "core_version": "1.0.0",
   "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
    },
    "message": {...}
}
```

### Asynchronous Response (Async Mode):

- To receive an asynchronous response:
  - Set sync_mode to false in the respective YAML file (e.g., rsf.yaml).
  - Optionally, set verify_sign to false in the YAML file if signatures in the header are not required.
  - Hit the URL: http://localhost:5500/receiver_recon
  - The response will be either Ack or Nack based on schema validation.

### Example

Request

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
   "bpp_uri": "https://rsf-mock-service.ondc.org/",
   "country": "IND",
   "timestamp": "2023-04-12T09:45:56.385Z",
   "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
   "core_version": "1.0.0",
   "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
 },
 "message": {...}
}
```

Response

```json
{
  "message": {
    "ack": {
      "status": "ACK"
    }
  }
}
```

## RSF Mock Service (https://rsf-mock-service.ondc.org/)

### Mock Service for Collector

- Collector calls /settle to receive /on_settle, and then /receiver_recon should be called to receive /on_receiver_recon.
  > Deployed_url = https://rsf-mock-service.ondc.org/settle , https://rsf-mock-service.ondc.org/receiver_recon

### Mock Service for Receiver

- The Receiver triggers the endpoint /push_receiver_recon to receive /receiver_recon on the bap_uri provided in the payload.
  > Deployed URL: https://rsf-mock-service.ondc.org/push_receiver_recon
- The receiver is expected to respond with an on_receiver_recon callback

### Points to remember (for mock server stubs only)

1. The settle call expects 5 settlement objects to function properly.
2. The receiver recon expects 5 order objects to function properly.
3. To mock the recon status, provide a placeholder settlement amount in the orders in an order book (e.g., less than 500 = 02 (Overpaid), more than 500 = 03 (Underpaid), and equal to 500 = 01 (Paid)).
