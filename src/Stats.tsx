import React, { useState, useEffect, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
// @ts-ignore
import StatsImpl from 'stats.js'

type Props = {
  showPanel?: number
  className?: string
}

export const Stats: React.FunctionComponent<Props> = ({ showPanel = 0, className }) => {
  const [stats] = useState(() => new (StatsImpl as any)())
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    stats.showPanel(showPanel)
    ref.current!.appendChild(stats.dom)
    if (className) stats.dom.classList.add(className)
    return () => ref.current!.removeChild(stats.dom)
  }, [])
  useFrame((state) => {
    stats.begin()
    state.gl.render(state.scene, state.camera)
    stats.end()
  }, 1)
  return <div className="statsReactContainer" ref={ref}></div>
}
