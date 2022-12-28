import { HiCheckCircle, HiInformationCircle } from 'react-icons/hi'
import { IoMdWarning } from 'react-icons/io'
import { toast } from 'react-toastify'

export const success = (message: string) =>
  toast.success(message, {
    progressClassName: 'bg-success-300',
    icon: <HiCheckCircle size={24} className="text-success-300" />,
  })

export const warn = (message: string) =>
  toast.warn(message, {
    progressClassName: 'bg-warning-300',
    icon: <IoMdWarning size={24} className="text-warning-300" />,
  })

export const error = (message: string) =>
  toast.error(message, {
    progressClassName: 'bg-danger-300',
    icon: <HiInformationCircle size={20} className="text-danger-300" />,
  })

export const info = (message: string) =>
  toast.info(message, {
    progressClassName: 'bg-primary-300',
    icon: <HiInformationCircle size={20} className="text-primary-300" />,
  })

export const primary = (message: string) =>
  toast(message, {
    progressClassName: 'bg-light-gray-100',
  })
