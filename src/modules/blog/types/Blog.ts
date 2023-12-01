import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { ProfileSchema } from '@/modules/auth/types/Profile'

export const PostSchema = z.object({
  id: z.number().nullish(),
  title: z.string().min(1, 'Campo obrigatório').max(100, 'Máximo 100 letras'),
  text: z.string().min(1, 'Campo obrigatório').max(5000, 'Máximo 5000 letras'),
  created_at: z.string().nullish(),
  user_id: z.string().nullish(),
})

export const CommentSchema = z.object({
  id: z.number().nullish(),
  text: z.string().min(1, 'Campo obrigatório').max(2000, 'Máximo 2000 letras'),
  created_at: z.string().nullish(),
  user_id: z.string().nullish(),
  post_id: z.number().nullish(),
})

export const PostsSchema = z.array(PostSchema)
export const PostWithProfileSchema = PostSchema.extend({
  profiles: ProfileSchema,
})
export const PostsWithProfileSchema = z.array(PostWithProfileSchema)

export const CommentsSchema = z.array(CommentSchema)
export const CommentWithProfileSchema = CommentSchema.extend({
  profiles: ProfileSchema,
})
export const CommentsWithProfileSchema = z.array(CommentWithProfileSchema)

export const validationPostSchema = toTypedSchema(PostSchema)
export const validationCommentSchema = toTypedSchema(CommentSchema)

export type Post = z.infer<typeof PostSchema>
export type Comment = z.infer<typeof CommentSchema>
export type PostWithProfile = z.infer<typeof PostWithProfileSchema>
export type CommentWithProfile = z.infer<typeof CommentWithProfileSchema>
