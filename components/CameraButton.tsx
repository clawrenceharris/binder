import { View, Text, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { Circle } from 'react-native-svg'
import { Colors } from '../constants'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'

const CIRCLE_LENGTH = 300
const BIG_CIRLCE_LENGTH = CIRCLE_LENGTH + 60
const STROKE_WIDTH = 10
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI)
const BIG_RADIUS = RADIUS + 10

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CameraButton = ({ maxDuration, isRecording }) => {
    const progress = useSharedValue(0)


    const moveRecordBar = () => {

        progress.value = withTiming(1, { duration: maxDuration })

    }

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: BIG_CIRLCE_LENGTH * (1 - progress.value),
        }
    })






    useEffect(() => {
        console.log(progress.value)
        if (isRecording) {
            moveRecordBar()
            if (progress.value == 1) {
                progress.value = 0

            }

        } else {
            progress.value = 0
        }


    })



    return (

        < View >



            {!isRecording && <Svg height={110} width={110} >

                <AnimatedCircle
                    cx={50 + (STROKE_WIDTH / 2)}
                    cy={50 + (STROKE_WIDTH / 2)}
                    r={RADIUS}
                    fill='#ffffff4D'

                />

                {/* {isRecording && <Circle
                    cx={50 + (STROKE_WIDTH / 2)}
                    cy={50 + (STROKE_WIDTH / 2)}
                    r={RADIUS}
                    fill='#ffffff4D'
                />} */}


                <Circle
                    cx={50 + (STROKE_WIDTH / 2)}
                    cy={50 + (STROKE_WIDTH / 2)}
                    r={RADIUS - 10}
                    fill={Colors.accent}
                    strokeWidth={STROKE_WIDTH}
                />





            </Svg>}


            {isRecording && <Svg height={130} width={130} style={{ transform: [{ rotateZ: '-90deg' }] }}>

                <AnimatedCircle
                    cx={60 + (STROKE_WIDTH / 2)}
                    cy={60 + (STROKE_WIDTH / 2)}
                    r={BIG_RADIUS}

                    stroke={Colors.light.primary}
                    strokeDasharray={BIG_CIRLCE_LENGTH}
                    strokeLinecap={'round'}
                    strokeWidth={STROKE_WIDTH}
                    animatedProps={animatedProps}

                />

                <Circle
                    cx={60 + (STROKE_WIDTH / 2)}
                    cy={60 + (STROKE_WIDTH / 2)}
                    r={RADIUS - 10}
                    fill='#ffffff4D'

                />
            </Svg>}
        </View >
    )
}

export default CameraButton

