import * as React from 'react'

import { useCategoriesSection } from './CategoriesSection.hook'
import { useConfig } from '@contexts/ConfigContext'
import { Input } from '@luma/ui'

import BoxSection from '@components/BoxSection'

const CategoriesSections: React.FC = React.forwardRef((_props, ref) => {
  const { categories } = useConfig()

  const { control, onAdd, onDelete, register, setValue } = useCategoriesSection(
    {
      categories,
    }
  )

  return (
    <BoxSection
      key={`${ref}`}
      title="Categorias"
      description="Adicione novas categorias ao sistema."
      className="space-y-6"
    >
      {categories && (
        <Input.Select.Add
          variant="filled"
          placeholder="Nova categoria"
          control={control}
          setValue={setValue}
          defaultValues={categories?.map((i) => i.name)}
          chipSize="medium"
          chipVariant="filled"
          onAdd={onAdd}
          onDelete={onDelete}
          chipDeleteIcon
          isFullWidth
          rounded
          isChipRounded
          {...register('categories')}
        />
      )}
    </BoxSection>
  )
})
export default CategoriesSections
