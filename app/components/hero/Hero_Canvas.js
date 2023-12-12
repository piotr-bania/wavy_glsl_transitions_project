'use client'

import './hero_canvas.scss'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import Hero_Image from './Hero_Image'
import { motion as m } from 'framer-motion'
import { canvas_variant } from '../animations/Framer_Motion_Variants'

const Hero_Canvas = () => {
    const [currentImage, setCurrentImage] = useState(0)

    return (
        <m.div
            className='hero_canvas'
            initial='hidden'
            animate='visible'
            variants={canvas_variant}
        >
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 7]} />
                <Hero_Image setCurrentImage={setCurrentImage} />
            </Canvas>
        </m.div>
    )
}

export default Hero_Canvas