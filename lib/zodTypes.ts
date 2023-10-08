import { z } from "zod"

export const RegistrationSchema = z.object({
  name: z.string().min(5, "Name must be atleast 5 Characters Long!").max(25, "Name cannot be longer than 25 Characters!"),
  email: z.string().email(),
  password: z.string().min(8, "Password Must Be atleast 8 Characters Long!"),
})

export type TRegistrationSchema = z.infer<typeof RegistrationSchema>