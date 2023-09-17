import z from "zod"

const noteFormSchema = z.object({
    title: z.string().min(2).trim(),
    noteContent: z.string().max(500,{message:"maximum 5 characters"}).min(5,{message:"minimum 5 characters"}),
    image: z.string().optional()
})


export default noteFormSchema;