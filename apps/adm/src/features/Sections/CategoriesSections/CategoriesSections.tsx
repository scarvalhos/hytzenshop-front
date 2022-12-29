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
      key={`${ref}`}
      title="Categorias"
      description="Adicione novas categorias ao sistema."
      className="space-y-3"
    >
      {categories && (
        <Input.Select.Add
          variant="filled"
          placeholder="Nova categoria"
          control={control}
          setValue={setValue}
          defaultValue={categories?.map((i) => i.name)}
          chipSize="medium"
          chipVariant="filled"
          onAdd={onAdd}
          onDelete={onDelete}
          chipDeleteIcon
          isFullWidth
          {...register('categories')}
        />
      )}
    </BoxSection>
  )
})
export default CategoriesSections
