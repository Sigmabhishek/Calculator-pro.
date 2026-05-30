function convert(type, value, from, to){

    value = Number(value);

    if(isNaN(value)) return "Error";

    const conv = {

        length: {
            m:1,
            km:1000,
            cm:0.01,
            mm:0.001,
            inch:0.0254,
            foot:0.3048
        },

        weight: {
            kg:1,
            g:0.001,
            lb:0.453592
        },

        temp: {
            c: (v, to) => {
                if(to==="f") return (v*9/5)+32;
                if(to==="k") return v+273.15;
                return v;
            },
            f: (v, to) => {
                if(to==="c") return (v-32)*5/9;
                if(to==="k") return (v-32)*5/9+273.15;
                return v;
            },
            k: (v, to) => {
                if(to==="c") return v-273.15;
                if(to==="f") return (v-273.15)*9/5+32;
                return v;
            }
        }
    };

    if(type === "temp"){
        return conv.temp[from](value,to);
    }

    let base = value * conv[type][from];
    return base / conv[type][to];
}