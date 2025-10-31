"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"

interface VoiceRecorderProps {
  isListening: boolean
  onListeningChange: (listening: boolean) => void
  onCommand: (command: string) => void
  transcript: string
}

export default function VoiceRecorder({ isListening, onListeningChange, onCommand, transcript }: VoiceRecorderProps) {
  const recognitionRef = useRef<any>(null)
  const [isBrowserSupported, setIsBrowserSupported] = useState(true)
  const [currentTranscript, setCurrentTranscript] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsBrowserSupported(false)
        return
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        onListeningChange(true)
        setCurrentTranscript("")
      }

      recognitionRef.current.onresult = (event: any) => {
        let interim = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            onCommand(transcript)
            setCurrentTranscript("")
          } else {
            interim += transcript
          }
        }
        setCurrentTranscript(interim)
      }

      recognitionRef.current.onend = () => {
        onListeningChange(false)
      }

      recognitionRef.current.onerror = () => {
        onListeningChange(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onListeningChange, onCommand])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }
  }

  return (
    <div className="space-y-4">
      {/* Voice Button */}
      <button
        onClick={toggleListening}
        disabled={!isBrowserSupported}
        className={`w-full py-8 rounded-2xl font-semibold transition-all border-2 flex flex-col items-center justify-center gap-3 ${
          isListening
            ? "bg-primary/30 border-primary text-primary animate-pulse"
            : "bg-primary/10 border-primary/40 text-foreground hover:bg-primary/20 hover:border-primary/60"
        } ${!isBrowserSupported ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isListening ? (
          <>
            <div className="w-12 h-12 bg-primary/40 rounded-full flex items-center justify-center animate-pulse">
              <Mic className="w-6 h-6" />
            </div>
            <span>Listening...</span>
          </>
        ) : (
          <>
            <MicOff className="w-6 h-6" />
            <span>Start Voice Command</span>
          </>
        )}
      </button>

      {/* Transcript Display */}
      {(currentTranscript || transcript) && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
          <div className="flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {isListening ? "Listening..." : "Last Command"}
              </p>
              <p className="text-foreground font-medium">{currentTranscript || transcript}</p>
            </div>
          </div>
        </div>
      )}

      {!isBrowserSupported && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
          Voice commands are not supported in your browser. Please use Chrome, Edge, or Safari.
        </div>
      )}
    </div>
  )
}
