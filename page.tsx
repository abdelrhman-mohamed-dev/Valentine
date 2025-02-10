"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

export default function ValentinePage() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [noButtonStyle, setNoButtonStyle] = useState({ left: "50%", top: "60%" })
  const [noClicks, setNoClicks] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setNoButtonStyle({ left: "50%", top: "60%" })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNoClick = () => {
    const newLeft = Math.min(Math.max(Math.random() * 80, 10), 80) // 10% to 80% horizontally
    const newTop = Math.min(Math.max(Math.random() * 70 + 20, 20), 90) // 20% to 90% vertically
    setNoButtonStyle({ left: `${newLeft}%`, top: `${newTop}%` })
    setNoClicks((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">Waffa, will you be my Valentine?</h1>
        {!showConfirmation ? (
          <div className="space-y-4">
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-110"
            >
              Yes <Heart className="inline-block ml-2" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={handleNoClick}
                style={{
                  position: "absolute",
                  left: noButtonStyle.left,
                  top: noButtonStyle.top,
                  transform: "translate(-50%, -50%)",
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full text-xl transition duration-300 ease-in-out pointer-events-auto"
              >
                No
              </button>
            </div>
            {noClicks > 0 && (
              <p className="text-sm text-gray-600 mt-4 animate-bounce">
                Oops! The "No" button seems to be playing hard to get. Keep trying!
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl text-pink-600 font-semibold">Yay! I'm so happy you said yes! ❤️</p>
            <p className="mt-2 text-gray-600">I can't wait to spend Valentine's Day with you!</p>
          </div>
        )}
      </div>
    </div>
  )
}

