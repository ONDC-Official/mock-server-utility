const {GenerateUuidOperation, ReadOperation, GenerateTmpstmpOperation ,EqualOperation, AndOrOperation, equalReturn} = require("./operations.js")
const {Input} = require("./schema.js")
function evaluateOperation(context, op) {
    var opt = __getOperation(context, op.type)
    if(op["input"]){
        opt.input = __evaluateInput(context, op["input"],op.type)
    }
        return opt.getOutput().getValue();
}

function __evaluateInput(context, inputObj,type) {
    var input = new Input(context, inputObj,type);
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
        case "EQUAL":
            return new EqualOperation(context)
        case "AND": case "OR" :
            return new AndOrOperation(context)
        case "EQUALRETURN":
            return new equalReturn(context)
    }
}

module.exports={evaluateOperation}