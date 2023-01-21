import { money, numtostr } from '@hytzenshop/helpers'
import { NewProductForm } from '@features/product/NewProductForm'
import { Product } from '@hytzenshop/types'
import { Button } from '@luma/ui'

import BaseModal from '../BaseModal/BaseModal'
import React from 'react'

interface EditProductButtonModalProps {
  buttonClassName?: string
  product?: Product
}

const EditProductButtonModal: React.FC<EditProductButtonModalProps> = ({
  buttonClassName,
  product,
}) => {
  const [openModal, setOpenModal] = React.useState(false)

  const defaultValues = {
    title: product?.title || '',
    price: money(product?.price) || '',
    description: product?.description || '',
    stock: numtostr(product?.stock) || '',
    images:
      product?.images.map((i) => {
        return {
          ...i,
          id: i?._id,
          preview: i?.url,
          uploaded: true,
        }
      }) || [],
    colors: product?.colors || [],
    sizes: product?.sizes || [],
    categories: product?.categories || [],
  }

  return (
    <>
      <Button
        variant="filled"
        className={buttonClassName}
        onClick={() => setOpenModal(true)}
        rounded
      >
        Editar produto
      </Button>

      <BaseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        panelClassName="p-0"
        customWidth="max-w-screen-md"
        glassEffect={false}
      >
        <NewProductForm
          type="PUT"
          fieldsVariant="filled"
          formClassName="max-h-[80vh] overflow-y-auto scrollbar-none"
          defaultValues={defaultValues}
          product={product}
          onClose={() => setOpenModal(false)}
        />
      </BaseModal>
    </>
  )
}

export default EditProductButtonModal
