import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ShaderMaterial, TextureLoader, Vector2 } from 'three'
import { Text } from '@react-three/drei'

import wave_vert from '../../../public/shaders/wave.vert'
import wave_frag from '../../../public/shaders/wave_interval.frag'

const Hero_Image = ({ setCurrentImage }) => {
    const image1 = '/images/image_1.webp'
    const image2 = '/images/image_2.webp'

    const imageRef = useRef()

    const [material, setMaterial] = useState([])
    const textureLoader = new TextureLoader()
    const texture = material[0]

    const [showText1, setShowText1] = useState(true)
    const [showText2, setShowText2] = useState(false)

    useFrame((_, delta) => {
        material.forEach(material => {
            if (material) {
                material.uniforms.uTime.value += delta

                const uBlendFactor = (Math.sin(material.uniforms.uTime.value * (Math.PI * .25)) + 1) * .5

                material.uniforms.uBlendFactor.value = uBlendFactor
                material.uniforms.progress.value = (Math.sin(material.uniforms.uTime.value * .5) + 1) * .5
            }

            if (material.uniforms.progress.value > .5) {
                setCurrentImage(1)
                setShowText1(false)
                setShowText2(true)
            } else if (material.uniforms.progress.value < .5) {
                setCurrentImage(0)
                setShowText1(true)
                setShowText2(false)
            }
        })
    })

    useEffect(() => {
        const Wave_Material = [...Array(1)].map(() => {
            const texture1 = textureLoader.load(image1)
            const texture2 = textureLoader.load(image2)

            return new ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uFrequency: { value: new Vector2(2, 1) },
                    uTransparency: { value: 1 },
                    uTexture1: { value: texture1 },
                    uTexture2: { value: texture2 },
                    uBlendFactor: { value: 0.0 },
                    progress: { value: 0.0 },
                    direction: { value: new Vector2(-1.0, 1.0) },
                },
                vertexShader: wave_vert,
                fragmentShader: wave_frag,
                side: THREE.FrontSide,
                transparent: true,
                opacity: .75,
            })
        })
        setMaterial(Wave_Material)
    }, [image1, image2])

    return (
        <>
            <mesh ref={imageRef} position={[1, 0, 0]} scale={5}>
                <planeGeometry args={[1.456, .816, 25, 25]} />
                {texture && <primitive object={texture} />}
            </mesh>

            {showText1 && (
                <Text
                    position={[-4, -1.5, 1]}
                    font='/fonts/Monument_Extended_Black.otf'
                    fontSize={.4}
                    textAlign='left'
                    anchorX='left'
                    anchorY='middle'
                    maxWidth={6}
                    color='#F5F5F5'
                >
                    A Sentinel's Vigil
                </Text>
            )}

            {showText2 && (
                <Text
                    position={[-4, -1.5, 1]}
                    font='/fonts/Monument_Extended_Black.otf'
                    fontSize={.4}
                    textAlign='left'
                    anchorX='left'
                    anchorY='middle'
                    maxWidth={6}
                    color='#F9D794'
                >
                    Splendor Amongst the Stars
                </Text>
            )}
        </>
    )
}

export default Hero_Image