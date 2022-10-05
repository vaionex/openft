import React from 'react'
import Lottie from 'lottie-react'
import LoadingBarsJson from '@/assets/animations/loading-bars.json'

const LoadingBars = () => {
  return (
    <div className="w-screen h-screen">
      <Lottie
        className="w-full h-full"
        animationData={LoadingBarsJson}
        loop
        autoPlay
      />
    </div>
  )
}

export default LoadingBars
