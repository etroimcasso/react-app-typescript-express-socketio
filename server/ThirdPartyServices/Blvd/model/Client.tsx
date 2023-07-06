import { CreditCard } from "./CreditCard"
import { MarketingSetting } from "./MarketingSetting"

export type Client = {
    active: boolean,
    appointmentCount: number,
    createdAt: string, //! DATETIME
    creditCardsOnFile: CreditCard[],
    custom: any, // TODO, maybe
    customFields: {[key: string]: string},
    dob: string, //! DATE
    email: string,
    externalId: string,
    firstName: string,
    hasCardOnFile: boolean,
    id: string | number,
    lastName: string,
    marketingSettings: MarketingSetting[],

}