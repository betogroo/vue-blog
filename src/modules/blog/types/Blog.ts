import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { ProfileSchema } from '@/modules/auth/types/Profile'

export const PostSchema = z.object({
  id: z.number().nullish(),
  title: z.string().min(1, 'Campo obrigatório').max(100, 'Máximo 100 letras'),
  text: z.string().min(1, 'Campo obrigatório').max(2000, 'Máximo 2000 letras'),
  created_at: z.string().nullish(),
  user_id: z.string().nullish(),
})

export const PostsSchema = z.array(PostSchema)
export const PostWithProfileSchema = PostSchema.extend({
  profiles: ProfileSchema,
})
export const PostsWithProfileSchema = z.array(PostWithProfileSchema)

export const validationPostSchema = toTypedSchema(PostSchema)

export type Post = z.infer<typeof PostSchema>
export type PostWithProfile = z.infer<typeof PostWithProfileSchema>
