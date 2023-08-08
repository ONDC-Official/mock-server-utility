# ondc-mock-server

### Purpose 

The mock server as name suggested is designed to test mock api's for developers (want to enhance or develop based on API Contracts).

### Tech

- [[node.js](https://nodejs.org/en/)]
- [[ajv](https://ajv.js.org/)]

## Installation

Clone the ONDC Mock Server repository

```bash
  git clone https://github.com/92shreyansh/ondc-mock-server.git
```


### How to add new Instruction Set

- Add bulild.yaml file inside the build folder. From this build file the instruction sets(like on-demand, public-transit etc) will be created along with their postman-collections. 

- Run 
    ```bash
    node app.js
    ```
    This will create the instructions sets folder depedning upon the yaml file
- If you want to run a server for an existing instruction-set or want to create & run new instruction-set 
```bash
    node app.js <instruction-set-name>
```   


### How we can test

- Import the postman-collection, This collection already has the payload set-up for the each end-point.
- Default this will run on port 5500, you can change this from ``` 
yaml-templates/exampleConfig.yaml```


> The utility validates all the payloads as documented in the [API Contract](https://drive.google.com/file/d/1Z0eT1PZ8_tthEyxli8bLs-B9oCYAZIS0/view).


There are two type of responses we can get for each payload - Sync and Async
1. Sync Response :
 > For sync respone, we should have sync_mode (in respective yaml file for eg : on_demand.yaml) as true
 > Also we can set verify_sign as false (in respective yaml file for eg : on_demand.yaml) if we dont want to send the signatures in header
 > Url to hit is - http://localhost:5500/search
 > It will give response for search as on_search, init as on_init and so on.
 > For eg: If we will have payload for search as 
 ```json
{
    "context": {
      "country": "IND",
      "domain": "ONDC:TRV10",
      "timestamp": "2023-06-27T04:41:16Z",
      "bap_id": "https://example-test-bap.com",
      "transaction_id": "6743e9e2-4fb5-487c-92b7-13ba8018f176",
      "message_id": "35513745-7bfc-43b0-aff4-bb414f98a11d",
      "city": "std:080",
      "core_version": "1.0.0",
      "action": "search",
      "bap_uri": "http://localhost:3400/"
    },
    "message": {
      "intent": {
        "fulfillment": {
          "start": {
            "location": {
              "gps": "12.923608703179461, 77.61462964117527"
            }
          },
          "end": {
            "location": {
              "gps": "12.9346302, 77.61533969999999"
            }
          }
        }
      }
    }
}
```
 > If schema validates the ouput will be as follows :
```json
 {
    "context": {
        "country": "IND",
        "bpp_uri": "http://localhost:5500/",
        "domain": "ONDC:TRV10",
        "timestamp": "2023-06-27T07:42:26.274Z",
        "bap_id": "https://example-test-bap.com",
        "transaction_id": "6743e9e2-4fb5-487c-92b7-13ba8018f176",
        "bpp_id": "localhost:5500",
        "message_id": "35513745-7bfc-43b0-aff4-bb414f98a11d",
        "city": "std:080",
        "core_version": "1.0.0",
        "action": "on_search",
        "bap_uri": "http://localhost:3400/"
    },
    "message": {
        "catalog": {
            "bpp/descriptor": {
                "name": "Test Name"
            },
            "bpp/providers": [
                {
                    "locations": [
                        {
                            "id": "1",
                            "gps": "12.9164682,77.6089985"
                        }
                    ],
                    "items": [
                        {
                            "id": "HR26DQ5551",
                            "descriptor": {
                                "name": "Auto Ride",
                                "code": "RIDE"
                            },
                            "price": {
                                "maximum_value": "156",
                                "currency": "INR",
                                "minimum_value": "176"
                            },
                            "tags": {
                                "groups/1/descriptor/name": "Daytime Charges",
                                "groups/1/descriptor/code": "fare_policy",
                                "groups/1/display": "true",
                                "groups/1/list/1/descriptor/name": "Min Fare upto 2 km",
                                "groups/1/list/1/value": "₹ 30 upto 2 km",
                                "groups/1/list/2/descriptor/name": "Rate above Min. Fare",
                                "groups/1/list/2/descriptor/code": "extra_fare",
                                "groups/1/list/2/value": "₹15 / km",
                                "groups/1/list/3/descriptor/name": "Driver Pickup Charges",
                                "groups/1/list/3/descriptor/code": "pickup_charges",
                                "groups/1/list/3/value": "₹ 10",
                                "groups/1/list/4/descriptor/name": "Nominal Fare",
                                "groups/1/list/4/descriptor/short_desc": "Driver may quote extra to cover for traffic, chance of return trip, etc.",
                                "groups/1/list/4/descriptor/code": "nominal_fare",
                                "groups/1/list/4/value": "₹ 10",
                                "groups/1/list/5/descriptor/name": "Waiting Charges",
                                "groups/1/list/5/descriptor/short_desc": "Driver may quote extra to cover for traffic, chance of return trip, etc.",
                                "groups/1/list/5/descriptor/code": "waiting_charges",
                                "groups/1/list/5/value": "₹ 0 / min",
                                "groups/2/descriptor/name": "Night Charges",
                                "groups/2/descriptor/code": "fare_policy",
                                "groups/2/display": "true",
                                "groups/2/list/1/descriptor/name": "Night Charges",
                                "groups/2/list/1/descriptor/code": "night_charges",
                                "groups/2/list/1/value": "1.5x of daytime charges applicable at night from 10 PM to 5 PM",
                                "groups/2/list/2/descriptor/name": "Night Shift Start",
                                "groups/2/list/2/descriptor/code": "night_shift_start_time",
                                "groups/2/list/2/value": "22:00:00",
                                "groups/2/list/3/descriptor/name": "Night Shift End",
                                "groups/2/list/3/descriptor/code": "night_shift_end_time",
                                "groups/2/list/3/value": "05:00:00",
                                "groups/3/descriptor/name": "General Information",
                                "groups/3/descriptor/code": "info",
                                "groups/3/display": "true",
                                "groups/3/list/1/descriptor/name": "Distance to nearest driver",
                                "groups/3/list/1/descriptor/code": "distance_to_nearest_driver",
                                "groups/3/list/1/value": "661 m",
                                "groups/3/list/2/descriptor/name": "Wait time upto",
                                "groups/3/list/2/descriptor/code": "waiting_time_estimated_threshold",
                                "groups/3/list/2/value": "3 min"
                            },
                            "fulfillment_id": "fb5c84d4-1b59-4b9d-96b5-9d79107432c5",
                            "payment_id": "1"
                        }
                    ],
                    "fulfillments": [
                        {
                            "id": "fb5c84d4-1b59-4b9d-96b5-9d79107432c5",
                            "start": {
                                "location": {
                                    "gps": "12.923608703179461, 77.61462964117527"
                                }
                            },
                            "end": {
                                "location": {
                                    "gps": "12.9346302, 77.61533969999999"
                                }
                            },
                            "vehicle": {
                                "category": "AUTO_RICKSHAW"
                            },
                            "tags": {
                                "groups/1/descriptor/code": "route_info",
                                "groups/1/descriptor/name": "Route Information",
                                "groups/1/display": "true",
                                "groups/1/list/1/descriptor/code": "encoded_polyline",
                                "groups/1/list/1/descriptor/name": "Path",
                                "groups/1/list/1/value": "_p~iF~ps|U_ulLnnqC_mqNvxq`@",
                                "groups/1/list/2/descriptor/code": "waypoints",
                                "groups/1/list/2/descriptor/name": "Waypoints",
                                "groups/1/list/2/value": "[{\"gps\":\"12.9099828, 77.6118226\"},{\"gps\":\"12.9099828, 77.6118226\"},{\"gps\":\"12.9099828, 77.6118226\"},{\"gps\":\"12.9099828, 77.6118226\"}]"
                            }
                        }
                    ],
                    "payments": [
                        {
                            "id": "1",
                            "type": "ON-FULLFILMENT",
                            "collected_by": "BPP"
                        }
                    ]
                }
            ]
        }
    }
}
```
2. Async Response :
 > For async respone, we should have sync_mode (in respective yaml file for eg : on_demand.yaml) as false
 > Also we can set verify_sign as false (in respective yaml file for eg : on_demand.yaml) if we dont want to send the signatures in header
> Url to hit is - http://localhost:5500/search
 > It will give response as Ack and Nack based upon schema validates or not
 > For eg: If we will have payload for search as
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