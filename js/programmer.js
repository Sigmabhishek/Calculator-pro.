function toBinary(n){
    return Number(n).toString(2);
}

function toHex(n){
    return Number(n).toString(16).toUpperCase();
}

function toOctal(n){
    return Number(n).toString(8);
}

function fromBinary(n){
    return parseInt(n,2);
}

function fromHex(n){
    return parseInt(n,16);
}

function fromOctal(n){
    return parseInt(n,8);
}