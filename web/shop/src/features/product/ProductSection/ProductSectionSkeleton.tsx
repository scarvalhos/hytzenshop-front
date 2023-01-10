import { useBreakpoint } from '@hytzenshop/hooks'
import { c } from '@hytzenshop/helpers'

const ProductSectionSkeleton: React.FC = () => {
  const { sm } = useBreakpoint()

  const indexes = sm ? [1, 2, 3, 4, 5] : [1]

  return (
    <div className={c('flex space-x-8 h-[300px] mb-8')}>
      {indexes.map((item) => (
        <div
          key={item}
          className="h-[100%] bg-dark-gray-400 flex-1 rounded-md animate-pulse"
        />
      ))}
    </div>
  )
}

export default ProductSectionSkeleton
