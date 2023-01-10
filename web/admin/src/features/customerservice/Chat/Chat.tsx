import * as EmojiPicker from 'emoji-picker-react'

import { TbArrowDown, TbArrowRight, TbMoodHappy, TbX } from 'react-icons/tb'
import { Button, Icons, Input, Shared } from '@luma/ui'
import { Virtuoso } from 'react-virtuoso'
import { useChat } from './Chat.hook'
import { c } from '@hytzenshop/helpers'

import React from 'react'

export interface ChatProps {
  id?: string | null
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const {
    setSeeEmojiPicker,
    parsedMessages,
    appendInterval,
    seeEmojiPicker,
    handleSubmit,
    setAtBottom,
    showButton,
    prevChatId,
    chatQuery,
    virtuoso,
    onSubmit,
    setValue,
    register,
    control,
    errors,
    watch,
    user,
  } = useChat({ id })

  const itemContent = React.useCallback(
    (_index: number, message: typeof parsedMessages[0]) => {
      return (
        <Shared.ChatMessageCard
          id={message.id}
          key={message.id}
          message={message.message}
          userId={user?.id}
          createdAt={message.createdAt}
          messageUserId={message.messageUserId}
          name={message.name}
          sended={message.sended}
          read={message.read}
        />
      )
    },
    [user?.id]
  )

  const renderVirtuoso = React.useCallback(() => {
    return (
      <div className="w-full h-full relative">
        <Virtuoso
          id={`chat-${id}`}
          ref={virtuoso}
          className="w-full"
          alignToBottom
          followOutput="auto"
          data={parsedMessages}
          itemContent={itemContent}
          totalCount={parsedMessages.length}
          atBottomStateChange={(bottom) => {
            clearInterval(appendInterval?.current as never)
            setAtBottom(bottom)
          }}
          initialTopMostItemIndex={{
            index: parsedMessages.length,
            align: 'end',
            behavior: 'auto',
          }}
        />

        {showButton && (
          <Button
            rounded
            className="p-3 bg-dark-gray-300 drop-shadow-lg absolute right-8 bottom-4"
            onClick={() =>
              virtuoso.current?.scrollToIndex({
                index: parsedMessages.length - 1,
                behavior: 'smooth',
              })
            }
          >
            <TbArrowDown />
          </Button>
        )}
      </div>
    )
  }, [
    parsedMessages,
    appendInterval,
    setAtBottom,
    itemContent,
    showButton,
    virtuoso,
    id,
  ])

  if (prevChatId !== id) return null

  return (
    <div className="bg-dark-gray-500 bg-opacity-30 rounded-md flex flex-col items-center justify-center flex-1 h-[78vh] py-8 max-lg:mt-8">
      {!chatQuery.data?.chat ? (
        <Icons.MailboxIcon className="h-40 w-fit" />
      ) : (
        <div className="w-full h-full rounded-sm flex flex-col items-center space-y-6">
          {renderVirtuoso()}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-6 relative"
          >
            {seeEmojiPicker && (
              <div className="mb-4">
                <EmojiPicker.default
                  theme={EmojiPicker.Theme.DARK}
                  autoFocusSearch
                  lazyLoadEmojis
                  suggestedEmojisMode={EmojiPicker.SuggestionMode.RECENT}
                  previewConfig={{
                    showPreview: false,
                  }}
                  width="100%"
                  height={360}
                  onEmojiClick={(e) =>
                    setValue(
                      'message',
                      (watch('message') || '').concat(e.emoji)
                    )
                  }
                />
              </div>
            )}

            <Input.Textarea
              rows={1}
              placeholder="Mensagem"
              control={control}
              variant="filled"
              isFullWidth
              rounded
              className="scrollbar-none"
              {...register('message')}
              error={String(errors.message?.message || '')}
              renderInsideInput={
                <span className="flex items-center justify-center space-x-2 px-3">
                  <Button
                    className="p-0"
                    onClick={() => setSeeEmojiPicker(true)}
                    rounded
                  >
                    <TbMoodHappy
                      size={24}
                      strokeWidth="1px"
                      className={c(
                        seeEmojiPicker
                          ? 'text-success-300'
                          : 'text-light-gray-500'
                      )}
                    />
                  </Button>

                  {seeEmojiPicker && (
                    <Button
                      className="p-0"
                      onClick={() => setSeeEmojiPicker(false)}
                      rounded
                    >
                      <TbX
                        size={24}
                        strokeWidth="1px"
                        className="text-light-gray-500"
                      />
                    </Button>
                  )}
                </span>
              }
              renderAfter={
                <Button
                  type="submit"
                  className="p-3"
                  variant="filled"
                  disabled={
                    watch('message') === undefined || watch('message') === ''
                  }
                  rounded
                  onClick={() => {
                    setSeeEmojiPicker(false)
                    virtuoso.current?.scrollToIndex({
                      index: parsedMessages.length - 1,
                      behavior: 'smooth',
                    })
                  }}
                >
                  <TbArrowRight />
                </Button>
              }
            />
          </form>
        </div>
      )}
    </div>
  )
}

export default Chat
