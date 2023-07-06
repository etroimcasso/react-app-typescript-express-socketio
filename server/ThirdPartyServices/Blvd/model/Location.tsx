import { Address } from "./Address"
import { Id } from "./ID"
import { PaymentOption } from "./PaymentOption"

export type Location = {
    address: Address,
    arrivalInstructions?: string,
    billingContactEmail?: string,
    businessName: string,
    contactEmail?: string,
    coordinates?: any,
    externalId?: string,
    googlePlaceId?: string,
    id: Id,
    isRemote: boolean,
    name: string,
    paymentOptions: PaymentOption[],
    phone?: string,
    staffServices?: any,
    tz: string, //! Timezone
    website?: string
}