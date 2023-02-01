import { Button, Icons, Input, toast } from '@luma/ui'
import { validateNewsletterSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { defaultToastError } from '@hytzenshop/helpers'
import { TbArrowRight } from 'react-icons/tb'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@hytzenshop/services'

import React from 'react'

const Newsletter: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateNewsletterSchema),
  })

  const onNewsletterSubmit = React.useCallback(async (values: FieldValues) => {
    return api
      .post('/newsletter', {
        email: values.newsletter,
      })
      .then(({ data }) => toast.success(data.message))
      .catch((e) => defaultToastError(e))
      .finally(() => reset({ newsletter: '' }, {}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="max-w-screen-2xl mx-auto px-8 sm:px-16 pt-10 pb-20 flex">
      <form
        onSubmit={handleSubmit(onNewsletterSubmit)}
        className="bg-primary bg-opacity-50 px-16 md:px-32 py-16 rounded-md flex flex-1 flex-col-reverse md:flex-row items-center justify-between gap-10"
      >
        <div className="flex flex-col max-md:items-center max-md:justify-center gap-8">
          <div className="flex flex-col max-md:items-center max-md:justify-center space-y-2">
            <p className="text-primary text-3xl font-bold max-md:text-center">
              Assine nossa Newsletter
            </p>

            <p className="text-light-gray-500 text-lg max-md:text-center">
              Tenha acesso à promoções e novidades exclusivas em seu email:
            </p>
          </div>

          <Input.Field
            type="email"
            control={control}
            error={errors.newsletter?.message?.toString()}
            isFullWidth
            containerClassName="max-w-2xl"
            variant="outlined"
            renderAfter={
              <Button
                type="submit"
                variant="filled"
                className="p-3"
                rounded={false}
              >
                <span className="flex items-center justify-center space-x-2">
                  <TbArrowRight />
                  <p className="max-sm:hidden">Inscrever</p>
                </span>
              </Button>
            }
            {...register('newsletter')}
          />
        </div>

        <Icons.MailboxIcon className="h-24 md:h-40" />
      </form>
    </section>
  )
}

export default Newsletter
