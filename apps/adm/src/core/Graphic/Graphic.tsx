import dynamic from 'next/dynamic'

import { ApexOptions } from 'apexcharts'
import { theme } from '@luma/ui'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors['light-gray'][500],
  },
  colors: [theme.colors.success[300]] as any[],
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors['light-gray'][500],
    },
    axisTicks: {
      color: theme.colors['light-gray'][500],
    },
    categories: [
      '2022-02-27T00:00:00.000Z',
      '2022-02-28T00:00:00.000Z',
      '2022-03-01T00:00:00.000Z',
      '2022-03-02T00:00:00.000Z',
      '2022-03-03T00:00:00.000Z',
      '2022-03-04T00:00:00.000Z',
      '2022-03-05T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
} as const

const series = [{ name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }]

interface GraphicProps {
  title?: string
}

const Graphic: React.FC<GraphicProps> = ({ title }) => {
  return (
    <div className="rounded-md bg-dark-gray-500 bg-opacity-50 p-4">
      <h2 className="text-light-gray-100 text-xl pl-4">{title}</h2>
      <Chart options={options} series={series} type="area" height={160} />
    </div>
  )
}

export default Graphic
