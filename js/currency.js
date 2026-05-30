async function convertCurrency(from, to, amount){

    try{
        let res = await fetch(
            `https://api.exchangerate.host/latest?base=${from}`
        );

        let data = await res.json();

        let rate = data.rates[to];

        return amount * rate;

    } catch(e){
        return "Error";
    }
}