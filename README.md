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
    "bap_id": "api.razorpay.com",
    "bpp_id": "abc.receiverapp.com",
    "domain": "ONDC:NTS10",
    "bap_uri": "https://api.razorpay.com/rsp",
    "bpp_uri": "https://abc.receiverapp.com",
    "country": "IND",
    "timestamp": "2023-04-12T09:45:56.385Z",
    "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
    "core_version": "1.0.0",
    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
  },
  "message": {
    "orderbook": {
      "orders": [
        {
          "id": "17d1b97b-276a-4321-144e-b1021539ba6d",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "501",
              "currency": "INR",
              "transaction_id": "3df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "790",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo6vNoHJMS",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18275-ONDC-1",
              "name": "Fast forward frieght"
            },
            "address": "kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12346-3",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo company Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmN9HUJl9J",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo6vNoHJMS",
          "order_recon_status": "01"
        },
        {
          "id": "17d1b97b-276a-4321-984e-b1021538ba5d",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "500",
              "currency": "INR",
              "transaction_id": "3df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "750",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo72PIAPFp",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18275-ONDC-1",
              "name": "Fast forward frieght"
            },
            "address": "kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12345-21",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo company Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmOvqKTOea",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo72PIAPFp",
          "order_recon_status": "01"
        },
        {
          "id": "17d1b97b-276a-4321-984e-b1021539ba5d",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "950",
              "currency": "INR",
              "transaction_id": "3df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "950",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo73hwPmr2",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18275-ONDC-1",
              "name": "Fast forward frieght"
            },
            "address": "kormanagala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12345-2",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo company Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmQabISUjv",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo73hwPmr2",
          "order_recon_status": "01"
        },
        {
          "id": "6e641c61-69c3-419c-9c65-2f8b892063a2",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "750",
              "currency": "INR",
              "transaction_id": "4df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "750",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo74ECYABS",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18375-ONDC-1",
              "name": "Convenicore"
            },
            "address": "Kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12346-20",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmRuHoPSxZ",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo74ECYABS",
          "order_recon_status": "01"
        },
                {
          "id": "6e641c61-69c3-419c-9c65-2f8b892063a2",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "750",
              "currency": "INR",
              "transaction_id": "4df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "750",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo74ECYABS",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18375-ONDC-1",
              "name": "Convenicore"
            },
            "address": "Kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12346-20",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmRuHoPSxZ",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo74ECYABS",
          "order_recon_status": "01"
        }
      ]
    }
  }
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
        "bap_uri": "https://api.razorpay.com/rsp",
        "bpp_uri": "https://rsf-mock-service.ondc.org/",
        "country": "IND",
        "timestamp": "2023-04-11T12:44:56.399Z",
        "message_id": "50a3ee2b-150e-42c4-981e-7601c23499ab",
        "core_version": "1.0.0",
        "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
    },
    "message": {
        "orderbook": {
            "orders": [
                {
                    "id": "17d1b97b-276a-4321-144e-b1021539ba6d",
                    "message": {
                        "code": "",
                        "name": ""
                    },
                    "invoice_no": "2023/XYZ/12346-3",
                    "settlement_id": "LcQnCmN9HUJl9J",
                    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
                    "receiver_app_id": "abc.receiverapp.com",
                    "collector_app_id": "abc.collectorapp.com",
                    "order_recon_status": "02",
                    "settlement_reference_no": "LcQnCo6vNoHJMS",
                    "counterparty_diff_amount": {
                        "value": "10",
                        "currency": "INR"
                    },
                    "counterparty_recon_status": "03"
                },
                {
                    "id": "17d1b97b-276a-4321-984e-b1021538ba5d",
                    "message": {
                        "code": "",
                        "name": ""
                    },
                    "invoice_no": "2023/XYZ/12345-21",
                    "settlement_id": "LcQnCmOvqKTOea",
                    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
                    "receiver_app_id": "abc.receiverapp.com",
                    "collector_app_id": "abc.collectorapp.com",
                    "order_recon_status": "02",
                    "settlement_reference_no": "LcQnCo72PIAPFp",
                    "counterparty_diff_amount": {
                        "value": "0",
                        "currency": "INR"
                    },
                    "counterparty_recon_status": "01"
                },
                {
                    "id": "17d1b97b-276a-4321-984e-b1021539ba5d",
                    "message": {
                        "code": "",
                        "name": ""
                    },
                    "invoice_no": "2023/XYZ/12345-2",
                    "settlement_id": "LcQnCmQabISUjv",
                    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
                    "receiver_app_id": "abc.receiverapp.com",
                    "collector_app_id": "abc.collectorapp.com",
                    "order_recon_status": "02",
                    "settlement_reference_no": "LcQnCo73hwPmr2",
                    "counterparty_diff_amount": {
                        "value": "10",
                        "currency": ""
                    },
                    "counterparty_recon_status": "03"
                },
                {
                    "id": "6e641c61-69c3-419c-9c65-2f8b892063a2",
                    "message": {
                        "code": "",
                        "name": ""
                    },
                    "invoice_no": "2023/XYZ/12346-20",
                    "settlement_id": "LcQnCmRuHoPSxZ",
                    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
                    "receiver_app_id": "abc.receiverapp.com",
                    "collector_app_id": "abc.collectorapp.com",
                    "order_recon_status": "02",
                    "settlement_reference_no": "LcQnCo74ECYABS",
                    "counterparty_diff_amount": {
                        "value": "10",
                        "currency": "INR"
                    },
                    "counterparty_recon_status": "03"
                },
                {
                    "id": "6e641c61-69c3-419c-9c65-2f8b892063a2",
                    "message": {
                        "code": "",
                        "name": ""
                    },
                    "invoice_no": "2023/XYZ/12346-20",
                    "settlement_id": "LcQnCmRuHoPSxZ",
                    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
                    "receiver_app_id": "abc.receiverapp.com",
                    "collector_app_id": "abc.collectorapp.com",
                    "order_recon_status": "02",
                    "settlement_reference_no": "LcQnCo74ECYABS",
                    "counterparty_diff_amount": {
                        "value": "10",
                        "currency": "INR"
                    },
                    "counterparty_recon_status": "03"
                }
            ]
        }
    }
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
    "bap_id": "api.razorpay.com",
    "bpp_id": "abc.receiverapp.com",
    "domain": "ONDC:NTS10",
    "bap_uri": "https://api.razorpay.com/rsp",
    "bpp_uri": "https://abc.receiverapp.com",
    "country": "IND",
    "timestamp": "2023-04-12T09:45:56.385Z",
    "message_id": "54bd80f2-d849-11ed-870f-acde48001122",
    "core_version": "1.0.0",
    "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025"
  },
  "message": {
    "orderbook": {
      "orders": [
        {
          "id": "17d1b97b-276a-4321-144e-b1021539ba6d",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "501",
              "currency": "INR",
              "transaction_id": "3df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "790",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo6vNoHJMS",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18275-ONDC-1",
              "name": "Fast forward frieght"
            },
            "address": "kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12346-3",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo company Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmN9HUJl9J",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo6vNoHJMS",
          "order_recon_status": "01"
        },
        {
          "id": "17d1b97b-276a-4321-984e-b1021538ba5d",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "500",
              "currency": "INR",
              "transaction_id": "3df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "750",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo72PIAPFp",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18275-ONDC-1",
              "name": "Fast forward frieght"
            },
            "address": "kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12345-21",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo company Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmOvqKTOea",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo72PIAPFp",
          "order_recon_status": "01"
        },
        {
          "id": "17d1b97b-276a-4321-984e-b1021539ba5d",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "950",
              "currency": "INR",
              "transaction_id": "3df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "950",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo73hwPmr2",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18275-ONDC-1",
              "name": "Fast forward frieght"
            },
            "address": "kormanagala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12345-2",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo company Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmQabISUjv",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo73hwPmr2",
          "order_recon_status": "01"
        },
        {
          "id": "6e641c61-69c3-419c-9c65-2f8b892063a2",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "750",
              "currency": "INR",
              "transaction_id": "4df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "750",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo74ECYABS",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18375-ONDC-1",
              "name": "Convenicore"
            },
            "address": "Kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12346-20",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmRuHoPSxZ",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo74ECYABS",
          "order_recon_status": "01"
        },
                {
          "id": "6e641c61-69c3-419c-9c65-2f8b892063a2",
          "state": "Completed",
          "payment": {
            "uri": "https://api.razorpay.com/rsp",
            "type": "ON-ORDER",
            "params": {
              "amount": "750",
              "currency": "INR",
              "transaction_id": "4df395a9",
              "transaction_status": "PAID"
            },
            "status": "PAID",
            "tl_method": "http/get",
            "collected_by": "BAP",
            "@ondc/org/return_window": "P6D",
            "@ondc/org/settlement_basis": "Collection",
            "@ondc/org/settlement_window": "P10D",
            "@ondc/org/settlement_details": [
              {
                "bank_name": "ICICI",
                "branch_name": "Chennai",
                "upi_address": "success@upi",
                "settlement_type": "neft",
                "beneficiary_name": "Itemcraze Solutions Pvt. Ltd",
                "settlement_phase": "sale-amount",
                "settlement_amount": "750",
                "settlement_status": "PAID",
                "beneficiary_address": "Chennai",
                "settlement_ifsc_code": "ICIC0006609",
                "settlement_reference": "LcQnCo74ECYABS",
                "settlement_timestamp": "2023-04-12T09:35:56.383Z",
                "settlement_counterparty": "buyer-app",
                "settlement_bank_account_no": "99679007677676"
              }
            ],
            "@ondc/org/withholding_amount": "0",
            "@ondc/org/collected_by_status": "Assert",
            "@ondc/org/return_window_status": "Assert",
            "@ondc/org/settlement_basis_status": "Assert",
            "@ondc/org/settlement_window_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_type": "Amount",
            "@ondc/org/withholding_amount_status": "Assert",
            "@ondc/org/buyer_app_finder_fee_amount": "0"
          },
          "provider": {
            "name": {
              "code": "18375-ONDC-1",
              "name": "Convenicore"
            },
            "address": "Kormangala"
          },
          "created_at": "2023-04-11T12:44:56.399Z",
          "invoice_no": "2023/XYZ/12346-20",
          "updated_at": "2023-04-12T09:35:56.383Z",
          "payerdetails": {
            "payer_name": "Itemzoo Pvt. Ltd",
            "payer_address": "Bengaluru",
            "payer_bank_code": "HDFC0000000",
            "payer_account_no": "509424924294248",
            "payer_virtual_payment_address": "80abc@abctMh2h"
          },
          "recon_status": "01",
          "settlement_id": "LcQnCmRuHoPSxZ",
          "transaction_id": "5fbdd03c-d54d-11ed-afa1-0242ad120025",
          "receiver_app_id": "abc.receiverapp.com",
          "collector_app_id": "abc.collectorapp.com",
          "receiver_app_uri": "https://abc.receiverapp.com",
          "withholding_tax_gst": {
            "value": "0",
            "currency": "INR"
          },
          "withholding_tax_tds": {
            "value": "0",
            "currency": "INR"
          },
          "deduction_by_collector": {
            "value": "0",
            "currency": "INR"
          },
          "settlement_reason_code": "01",
          "settlement_reference_no": "LcQnCo74ECYABS",
          "order_recon_status": "01"
        }
      ]
    }
  }
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