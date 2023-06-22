const {GenerateUuidOperation, ReadOperation, GenerateTmpstmpOperation} = require("./operations.js")
const {Input} = require("./schema.js")
function evaluateOperation(context, op) {
    var opt = __getOperation(context, op.type)
    if(op["input"]){
        opt.input = __evaluateInput(context, op["input"])
    }
    return opt.getOutput().getValue();
}

function __evaluateInput(context, inputObj) {
    var input = new Input(context, inputObj);
    return input;
}

function __getOperation(context, op){
    switch(op){
        case "GENERATE_UUID":
            return new GenerateUuidOperation(context)
        case "READ":
            return new ReadOperation(context)
        case "GENERATE_TIMESTAMP":
            return new GenerateTmpstmpOperation(context)
    }
}

module.exports={evaluateOperation}