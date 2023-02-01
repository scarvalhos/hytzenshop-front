import { useConfig } from '@contexts/ConfigContext'
import { Link } from '@luma/ui'

import React from 'react'

const Announcement: React.FC = () => {
  const { announcement, showAnnouncement, announcementImage } = useConfig()

  return showAnnouncement ? (
    <section className="max-w-screen-2xl mx-auto px-8 sm:px-16 py-10 flex">
      <div
        className="flex-1 relative bg-cover bg-center h-[25vh] bg-dark-gray-500 rounded-md hover:border hover:border-success-300"
        style={{ backgroundImage: `url('${announcementImage?.url}')` }}
      >
        <Link href="/">
          <div className="absolute top-0 left-0 right-0 bottom-0 px-16 md:px-32 py-6 flex flex-col justify-center items-start z-10">
            <p className="text-light-gray-100 text-2xl md:text-3xl font-semibold max-w-lg text-center md:text-left">
              {announcement}
            </p>
          </div>

          <div className="hidden dark:block w-full h-full rounded-md absolute top-0 left-0 bg-gradient-to-r from-[#050505] bg-opacity-20 border-[1.5px] border-[#050505] hover:border-success-300" />
        </Link>
      </div>
    </section>
  ) : null
}

export default Announcement
