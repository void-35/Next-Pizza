export const mapPizzaSize = {
    20: '20 см',
    30: '30 см',
    40: '40 см',
}

export const mapPizzaType = {
    1: 'Традиционная',
    2: 'Тонкая',
}

export const basePizzaSizes = Object.entries(mapPizzaSize).map(([value, name])=>({
    name,
    value
}))
export const basePizzaTypes = Object.entries(mapPizzaType).map(([value, name])=>({
    name,
    value
}))

export type PizzaSizes = keyof typeof mapPizzaSize
export type PizzaTypes = keyof typeof mapPizzaType