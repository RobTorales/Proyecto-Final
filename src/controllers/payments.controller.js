import Stripe from "stripe";

const stripe =  new Stripe("pk_test_51OKlSqIPCum7aCy4YHhzhdIHLbJYhf5czJ4Jr8tv7x8IT3zdhMmDG4orw1nljxmvZsLsQyWSuoqNyYgd0C3SrL1c00BNu0Ozgw")

export const createSession = (req, res) => res.send("checkout");