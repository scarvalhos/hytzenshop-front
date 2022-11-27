import { useConfig } from '@contexts/ConfigContext'
import { Option } from '.'

export const useConfigTypes = () => {
  const { categories } = useConfig()

  const c = categories || []

  const categoriesConst = c?.map((category) => category.name)

  const categoriesOptions: Option<typeof categoriesConst[number]>[] = [
    ...c.map((category) => ({
      label:
        category.name.replaceAll('-', ' ').charAt(0).toUpperCase() +
        category.name.replaceAll('-', ' ').slice(1),
      value: category.name,
    })),
  ]

  const categoriesTabs = [
    {
      title: 'Tudo',
      link: '/',
    },
    ...c.map((category) => ({
      title:
        category.name.replaceAll('-', ' ').charAt(0).toUpperCase() +
        category.name.replaceAll('-', ' ').slice(1),
      link: `/category/${category.name}`,
    })),
  ]

  return {
    categoriesOptions,
    categoriesConst,
    categoriesTabs,
  }
}
