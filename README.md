# ondc-mock-server

### Purpose 

The mock server as name suggested is designed to test mock api's

### Tech

- [[node.js](https://nodejs.org/en/)]
- [[ajv](https://ajv.js.org/)]

### Steps to run 

Start Docker Desktop application.
Run “docker build -t ondc .” in your terminal or in your vs studio terminal ensure that you are in the project path.
Run “docker run -dp 5500:5500 ondc” to start the container with port 5500.
You would be able to hit any api now.
To stop the container you need container id for this run docker ps and copy the container id in which image ondc. Then run “docker stop <container_id>“
To remove the container run “docker rm <container_id>”
To delete an image run “docker rmi -f ondc”

### How we can test

> There must be a separate payload for every API.

> All the payloads should be named in the correct format as mentioned in the table below.

> The utility validates all the payloads as documented in the [API Contract](https://drive.google.com/file/d/1Z0eT1PZ8_tthEyxli8bLs-B9oCYAZIS0/view).

| Payloads (Correct Format)                   |
| ------------------------------------------- |
| search.json                                 |
| on_search.json                              |
| select.json                                 |
| on_select.json                              |
| init.json                                   |
| on_init.json                                |
| confirm.json                                |
| on_confirm.json                             |
| cancel.json                                 |
| on_cancel.json                              |
| track.json                                  |
| on_track.json                               |
| on_status_pending.json (Pending)            |
| on_status_picked.json (Order-picked-up)     |
| on_status_delivered.json (Order-delivered)  |
| update.json                                 |
| update_billing.json (Refund)                |
| on_update_initiated.json (Return_Initiated) |
| on_update_approved.json (Return_Approved)   |
| on_update_picked.json (Return_Picked)       |
| on_update_delivered.json (Return_Delivered) |
| on_update_liquidated.json (Liquidated)      |
| on_update_rejected.json (Return_Rejected)   |
| support.json                                |
| on_support.json                             |

> Sample payload for search.json is demonstrated below:

```json
{
    "context": {
        "domain": "nic2004:52110",
        "country": "IND",
        "city": "std:022",
        "action": "search",
        "core_version": "1.1.0",
        "bap_id": "buyer-app-preprod.ondc.org",
        "bap_uri": "http://localhost:3400/",
        "transaction_id": "6e41a9dc-4f41-40f3-b940-e48b7c603829",
        "message_id": "a52338b4-a0a0-47b9-be2a-0f446b0d4080",
        "timestamp": "2023-06-13T02:19:29.588Z",
        "ttl": "PT30S"
    },
    "message": {
        "intent": {
            "item": {
                "descriptor": {
                    "name": "wai wai"
                }
            },
            "fulfillment": {
                "type": "Delivery",
                "end": {
                    "location": {
                        "gps": "18.9391840000001,72.837118"
                    }
                }
            },
            "payment": {
                "@ondc/org/buyer_app_finder_fee_type": "percent",
                "@ondc/org/buyer_app_finder_fee_amount": "3.0"
            }
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

