const findPrice = (data, players, type) => {
    return data.filter(price => price.type === type && price.players === players)[0].price
}

module.exports = {
    findPrice
}