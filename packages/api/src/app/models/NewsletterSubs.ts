import mongoose, { model } from 'mongoose'

interface NewsletterSubsType {
  email: string
}

const NewsletterSubsSchema = new mongoose.Schema<NewsletterSubsType>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const NewsletterSubs = model<NewsletterSubsType>(
  'NewsletterSubs',
  NewsletterSubsSchema
)
