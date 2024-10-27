'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download, Mic } from "lucide-react"

export function AudioTranscriber() {
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) return

    setIsLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Transcription failed')
      }

      const data = await response.json()
      setTranscription(data.transcription)
    } catch (error) {
      console.error('Error:', error)
      setTranscription('An error occurred during transcription.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([transcription], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = "transcription.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-card rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:flex-1 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-border">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary flex items-center"
            >
              <Mic className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Audio Transcriber
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="audio-file" className="text-foreground font-medium">Upload Audio File</Label>
                <Input id="audio-file" type="file" accept="audio/*" onChange={handleFileChange} className="mt-1" />
              </div>
              <Button type="submit" disabled={!file || isLoading} className="w-full">
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transcribing...
                  </motion.div>
                ) : (
                  'Transcribe'
                )}
              </Button>
            </form>
          </div>
          <div className="lg:flex-1 p-4 sm:p-6 lg:p-8 bg-card">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg sm:text-xl font-semibold mb-4 text-primary"
            >
              Transcription
            </motion.h2>
            <AnimatePresence mode="wait">
              {transcription ? (
                <motion.div
                  key="transcription"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-popover p-3 sm:p-4 rounded-md mb-4 h-[200px] sm:h-[250px] lg:h-[calc(100%-130px)] overflow-auto border border-border">
                    <p className="text-popover-foreground text-sm sm:text-base">{transcription}</p>
                  </div>
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Transcription
                  </Button>
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground text-sm sm:text-base"
                >
                  Transcription will appear here after processing.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}