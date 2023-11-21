import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const PostSchema = z.object({
  id: z.number().nullish(),
  title: z.string().min(1, 'Campo obrigatório').max(100, 'Máximo 100 letras'),
  text: z.string().min(1, 'Campo obrigatório').max(500, 'Máximo 100 letras'),
  created_at: z.string().nullish(),
})

export const validationPostSchema = toTypedSchema(PostSchema)

export type Post = z.infer<typeof PostSchema>
