import * as React from 'react'
import * as Input from '@core/Input'

import { useCategoriesSection } from './CategoriesSection.hook'
import { useConfig } from '@contexts/ConfigContext'

import BoxSection from '@core/BoxSection'

const CategoriesSections: React.FC = React.forwardRef((_props, ref) => {
  const { categories } = useConfig()

  const { control, onAdd, onDelete, register, setValue } = useCategoriesSection(
    {
      categories,
    }
  )

  return (
    <BoxSection
      title="Categorias"
      description="Adicione novas categorias ao sistema."
      spacing
      key={`${ref}`}
    >
      {categories && (
        <Input.Select.Add
          placeholder="Nova categoria"
          control={control}
          setValue={setValue}
          defaultValue={categories?.map((i) => i.name)}
          chipSize="medium"
          chipVariant="filled"
          onAdd={onAdd}
          onDelete={onDelete}
          rounded
          isChipRounded
          chipDeleteIcon
          {...register('categories')}
        />
      )}
    </BoxSection>
  )
})
export default CategoriesSections
