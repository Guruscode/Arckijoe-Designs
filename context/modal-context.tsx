'use client'

import React, { createContext, useContext, useState } from 'react'

export interface VideoModalData {
  src: string
  title: string
  category: string
}

export interface ImageModalData {
  src: string
  title: string
}

interface ModalContextType {
  isOpen: boolean
  modalType: 'consultation' | 'video' | 'image' | null
  videoData: VideoModalData | null
  imageData: ImageModalData | null
  openModal: () => void
  openConsultationModal: () => void
  openVideoModal: (video: VideoModalData) => void
  openImageModal: (image: ImageModalData) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModalType] = useState<'consultation' | 'video' | 'image' | null>(null)
  const [videoData, setVideoData] = useState<VideoModalData | null>(null)
  const [imageData, setImageData] = useState<ImageModalData | null>(null)

  const openConsultationModal = () => {
    setVideoData(null)
    setImageData(null)
    setModalType('consultation')
  }

  const openVideoModal = (video: VideoModalData) => {
    setVideoData(video)
    setImageData(null)
    setModalType('video')
  }

  const openImageModal = (image: ImageModalData) => {
    setVideoData(null)
    setImageData(image)
    setModalType('image')
  }

  const closeModal = () => {
    setModalType(null)
    setVideoData(null)
    setImageData(null)
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen: modalType !== null,
        modalType,
        videoData,
        imageData,
        openModal: openConsultationModal,
        openConsultationModal,
        openVideoModal,
        openImageModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}
