import { File } from '../app/models/File'

const searchFile = (id: string | string[]) => {
  return typeof id === 'string'
    ? File.findById(id)
    : Promise.all(id.map((el) => File.findById(el)))
}

export { searchFile }
