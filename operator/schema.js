class IOElement{
    context;
    operation;
    value;
    __process(){
        if(this.operation) {
            this.value = evaluateOperation(this.context, this.operation);
        }
        return this
    }
    getValue(){
        return this.value;
    }
}

class Input extends IOElement {

    constructor(context, config){
        super();
        this.context = context
        this.operation = config.operation
        this.value = config.value
        this.__process();
    }

}

class Output extends IOElement{
    constructor(value) {
        super();
        this.value = value
    }
    getValue(){
        this.__process
        return this.value;
    }
}

module.exports={
    Input, Output
}