'use client'
import React from 'react'
import { useChatBot } from '@/hooks/chatbot/use-chatbot'

type Props = {}

const AiChatBot = (props: Props) => {
   const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot()

  return (
    <div>
      AiChatBot
    </div>
  )
}

export default AiChatBot