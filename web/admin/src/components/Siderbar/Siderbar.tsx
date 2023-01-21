import { Nav, SubMenu, SubMenuItem, SiderBarContainer } from './styles'
import { Button, Tooltip } from '@luma/ui'
import { IoIosArrowBack } from 'react-icons/io'
import { useSiderbar } from './Siderbar.hook'
import { TbMenu } from 'react-icons/tb'
import { c } from '@hytzenshop/helpers'

import React from 'react'

export interface SiderbarProps {
  openSiderbar: boolean
  onDrawerOpen: () => void
  onDrawerClose: () => void
}

export const Siderbar: React.FC<SiderbarProps> = (props) => {
  const {
    linksBottom,
    linksMiddle,
    linksTop,
    isOpen,
    onClose,
    onOpen,
    pathname,
    push,
    sm,
  } = useSiderbar(props)

  const SubMenuItemComponent = ({
    link,
    open,
  }: {
    link: {
      title: string
      path: string
      Icon: () => JSX.Element
    }
    open: boolean
  }) => {
    return (
      <SubMenuItem
        open={props.openSiderbar}
        onClick={() => {
          push(link.path)
          onClose()
        }}
        className={c(
          'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300 hover:shadow-md',
          open ? 'space-x-2 rounded-r-full' : 'rounded-full',
          pathname.startsWith(link.path)
            ? 'bg-success-300 bg-opacity-10 text-success-300 shadow-md'
            : 'bg-[transparent] text-light-gray-500'
        )}
      >
        <link.Icon />
        {open ? <p className="text-base">{link.title}</p> : null}
      </SubMenuItem>
    )
  }

  const SiderBarOpened = () => {
    return (
      <div className="bg-black bg-opacity-30 absolute top-0 bottom-0 left-0 right-0 z-50">
        <SiderBarContainer
          className="w-52 fixed top-0 left-0 bottom-0 flex bg-light-gray-100 dark:bg-dark-gray-500z-50 transition-all drop-shadow-md"
          {...(sm
            ? {
                animation: isOpen ? 'right' : 'left',
              }
            : {
                animationMobile: isOpen ? 'right' : 'left',
              })}
        >
          <Nav>
            <Button
              className="absolute top-[16px] -right-[14px] p-2 bg hover:bg-secondary border border-dark-gray-300 drop-shadow-md"
              onClick={onClose}
              rounded
            >
              <IoIosArrowBack size={14} color="inherit" />
            </Button>

            <SubMenu className="mt-8 sm:w-full">
              {linksTop.map((link) => (
                <SubMenuItemComponent
                  key={link.title}
                  link={link}
                  open={props.openSiderbar}
                />
              ))}
            </SubMenu>
            <SubMenu className="sm:w-full">
              {linksMiddle.map((link) => (
                <SubMenuItemComponent
                  key={link.title}
                  link={link}
                  open={props.openSiderbar}
                />
              ))}
            </SubMenu>
            <SubMenu className="sm:w-full">
              {linksBottom.map((link) => (
                <SubMenuItemComponent
                  key={link.title}
                  link={link}
                  open={props.openSiderbar}
                />
              ))}
            </SubMenu>
          </Nav>
        </SiderBarContainer>
      </div>
    )
  }

  const SiderBarClosed = () => {
    return (
      <div className="fixed top-0 left-0 bottom-0 flex flex-col justify-start items-center sm:bg-light-gray-100 dark:sm:bg-dark-gray-500 z-[999] opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex items-center max-sm:space-x-2 p-3 max-sm:mt-2">
          <Button className="sm:hidden bg p-2 ml-4" rounded onClick={onOpen}>
            <TbMenu size={20} />
          </Button>

          {sm ? (
            <Button
              className="p-2 hover:bg-secondary drop-shadow-md mt-4"
              onClick={onOpen}
              rounded
            >
              <TbMenu />
            </Button>
          ) : null}
        </div>

        {sm ? (
          <>
            <SubMenu>
              {linksTop.map((link) => (
                <Tooltip key={link.title} content={link.title} side="right">
                  <SubMenuItemComponent
                    key={link.title}
                    link={link}
                    open={props.openSiderbar}
                  />
                </Tooltip>
              ))}
            </SubMenu>
            <SubMenu>
              {linksMiddle.map((link) => (
                <Tooltip key={link.title} content={link.title} side="right">
                  <SubMenuItemComponent
                    key={link.title}
                    link={link}
                    open={props.openSiderbar}
                  />
                </Tooltip>
              ))}
            </SubMenu>
            <SubMenu>
              {linksBottom.map((link) => (
                <Tooltip key={link.title} content={link.title} side="right">
                  <SubMenuItemComponent
                    key={link.title}
                    link={link}
                    open={props.openSiderbar}
                  />
                </Tooltip>
              ))}
            </SubMenu>
          </>
        ) : null}
      </div>
    )
  }

  return props.openSiderbar ? <SiderBarOpened /> : <SiderBarClosed />
}
