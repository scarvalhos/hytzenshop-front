import UserProfileFormSectionEditable from './UserProfileFormSectionEditable'
import UserProfileFormSectionReadonly from './UserProfileFormSectionReadonly'
import React from 'react'

interface UserProfileFormSectionProps {
  checkout?: boolean
}

const UserProfileFormSection: React.FC<UserProfileFormSectionProps> = (
  props
) => {
  const state = React.useState({
    readonly: true,
  })

  return (
    <>
      {state[0].readonly ? (
        <UserProfileFormSectionReadonly state={state} {...props} />
      ) : (
        <UserProfileFormSectionEditable state={state} {...props} />
      )}
    </>
  )
}

export default UserProfileFormSection
