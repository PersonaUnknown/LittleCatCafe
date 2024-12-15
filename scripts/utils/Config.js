const width = 1280;
const height = 720;

const ITEMS = Object.freeze({
    any : -1,
    bread : 0,
    egg : 1,
    cheese : 2,
    bacon : 3,
    toast : 4,
    donut : 5,
    coffee : 6,
    lettuce : 7,
    tomato : 8,
    ham : 9,
    jelly : 10,
    peanut_butter : 11,
    muffin : 12,
    milk : 13,
    chocolate : 14,
    water : 15,
    americano : 16,
    latte : 17,
    mocha : 18,
    raw_bacon : 19,
    raw_egg : 20,
    bad_coffee : 21,
    raw_burrito : 22,
    burrito : 23,
    cookie : 24,
    croissant : 25,
    danish : 26,
    cake : 27,
    ramen_raw : 28,
    ramen_cooked : 29,
    ramen_water : 30,
    sandwich_ham_cheese : 31,
    sandwich_blt : 32,
    sandwich_breakfast : 33,
    sandwich_cheese_raw : 34,
    sandwich_cheese_cooked : 35,
    sandwich_christo_raw : 36,
    sandwich_christo_cooked : 37,
    sandwich_pbj : 38,
    bad_sandwich : 39,
})

const ITEM_NAMES = [
    "Bread",
    "Fried egg",
    "Cheese",
    "Cooked bacon",
    "Toast",
    "Donut",
    "Espresso",
    "Lettuce",
    "Tomato",
    "Ham",
    "Jelly",
    "Peanut butter",
    "Muffin",
    "Milk",
    "Chocolate",
    "Water",
    "Americano",
    "Latte",
    "Mocha",
    "Raw bacon",
    "Egg",
    "Bad coffee",
    "Cold burrito",
    "Burrito",
    "Cookie",
    "Croissant",
    "Danish",
    "Cake",
    "Ramen",
    "Cooked ramen",
    "Ramen w/ water",
    "Ham & cheese sandwich",
    "BLT sandwich",
    "Breakfast sandwich",
    "Cheese sandwich",
    "Grilled cheese",
    "Uncooked Monte Christo",
    "Cooked Monte Christo",
    "PB & J",
    "Bad sandwich",
]

const ITEMS_MENU = [
    ITEMS.donut,
    ITEMS.coffee,
    ITEMS.muffin,
    ITEMS.americano,
    ITEMS.latte,
    ITEMS.mocha,
    ITEMS.burrito,
    ITEMS.cookie,
    ITEMS.croissant,
    ITEMS.danish,
    ITEMS.cake,
    ITEMS.ramen_cooked,
    ITEMS.sandwich_ham_cheese,
    ITEMS.sandwich_blt,
    ITEMS.sandwich_breakfast,
    ITEMS.sandwich_cheese_cooked,
    ITEMS.sandwich_christo_cooked,
    ITEMS.sandwich_pbj,
]

const RECIPES_ONE = [
    "Americano: Espresso + Water",
    "Latte: Espresso + Milk",
    "Mocha: Espresso + Milk + Chocolate",
    "Egg: Put raw egg on stove",
    "Bacon: Put raw bacon on\nthe stove",
    "Burrito: Put raw burrito in the\nmicrowave",
    "Cup Noodle: Fill uncooked noodles\nin sink and then microwave it",
    "BLT: Toast + Tomato + Lettuce +\nBacon",
    "Cheese Sandwich: Bread + Cheese",
    "Grilled Cheese: Put a Cheese\nSandwich on the stove",
    "Ham + Cheese Sandwich: Toast\n+ Ham + Cheese",
    "Breakfast Sandwich: Toast + Egg\n+ Bacon + Cheese",
]
const RECIPES_TWO = [
    "PB And J Sandwich: Toast +\n Peanut Butter + Jelly",
    "Monte Christo: Toast + Ham\n + Cheese + Jelly",
    "Cooked Monte Christo: Put\nMonte Christo on stove"
]