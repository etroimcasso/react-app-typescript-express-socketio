import { Id } from "./ID"

export type Note = {
    createdAt: string, //! DATETIME
    id: Id,
    insertedAt: string, //! DATETIME
    text: string
}