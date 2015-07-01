# dynamicSchema
Parse.com introduced an ability to add dynamic schema. 
This is a simple mongoose / mongo / express based attempt to implement that.

## Example Schema that you can POST

```
// POST http://localhost:4444/dataIQ
// JSON Body:
{   
    "name": "LightSensor",
    "schema": {
        "userId": "String",
        "deviceId": "String",
        "companionId": "String",
        "type": {
            "type": "String"
        },
        "createdAt": {
            "type": "Date"
        },
        "updatedAt": {
            "type": "Date"
        },
        "payload": {
            "lux": "Number",
            "timestamp": "Date"
        }
    }
}
```
