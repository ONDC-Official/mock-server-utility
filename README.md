# ondc-mock-server-utility

### Purpose

The ONDC Mock Server is a tool specifically designed to test network integration, based on ONDC model implementation

### Technologies Used

- [[node.js](https://nodejs.org/en/)]

You can install the RSF mock server on your local system and run it as a service using the following steps:

1. Setup on Local System:
   - Install the RSF mock server on your local machine.

2. Running as a Service:
   - Configure the RSF mock server to run as a service for seamless operation.

The following instructions will guide you through the process of both local installation and running the mock server as a service.

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

- The Receiver triggers the endpoint /push_receiver_recon to receive /receiver_recon on the bpp_uri provided in the payload.
  > Deployed URL: https://rsf-mock-service.ondc.org/push_receiver_recon
- The receiver is expected to respond with an on_receiver_recon callback

### Example

context and recon_status values will be copied from your input payload into the callback payload.

Request (push_receiver_recon)
```json
{
    "context": {
        "bpp_uri": "https://rsf-mock-service.ondc.org/",
        "bpp_id": "rsf-mock-service.ondc.org",
        "message_id": "54b6a08e-d849-11ed-870f-acde48001122",
        "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
    },
    "message": {
        "orderbook": {
            "orders": [
                {
                    "recon_status": "01"
                },
                 {
                    "recon_status": "02"
                },
                 {
                    "recon_status": "03"
                },
                 {
                    "recon_status": "02"
                },
                 {
                    "recon_status": "01"
                }
            ]
        }
    }
}
```
### Points to remember (for mock server stubs only)

1. The settle call expects 5 settlement objects to function properly.
2. The receiver recon expects 5 order objects to function properly.
3. To mock the "recon_status" attribute, provide a placeholder settlement amount in the orders in an order book (e.g., less than 500 = 02 (Overpaid), more than 500 = 03 (Underpaid), and equal to 500 = 01 (Paid)).

> Community contributions are welcomed to enhance this utility for future releases.
> If you encounter any issues, a new issue report can be created on our [GitHub issue board](https://github.com/ONDC-Official/mock-server-utility/issues).

