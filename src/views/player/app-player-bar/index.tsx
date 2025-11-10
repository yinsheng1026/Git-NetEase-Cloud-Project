//模板

import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, PlayerBarWrpper } from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { UseAppSelect } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { getPlayerUrl } from '@/utils/handle-player'
// import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}
const AppPlayerBar: FC<IProps> = () => {
  //记录是否播放
  const [isPlaying, setIsPlaying] = useState(false)

  //记录进度条
  const [progress, setProgress] = useState(0)

  //记录当前时间
  const [currentTime, setCurrenttime] = useState(0)

  //记录总时间
  const [duration, setDuration] = useState(0)

  //记录是否交互状态
  const [isChanging, setIsChanging] = useState(false) // 新增：控制状态更新
  const audioRef = useRef<HTMLAudioElement>(null)
  const currentSong = UseAppSelect((state) => state.player.currentSong)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = getPlayerUrl(currentSong.id)
    // audioRef.current
    //   .play()
    //   .then(() => {
    //     console.log('播放成功')
    //     setIsPlaying(true)
    //   })
    //   .catch((err) => {
    //     console.log('播放失败:', err)
    //     setIsPlaying(false)
    //   })
    setDuration(currentSong.dt)
  }, [currentSong])

  function handlePlayBtnClick() {
    const isPaused = audioRef.current!.paused
    isPaused
      ? audioRef.current?.play().catch(() => setIsPlaying(false))
      : audioRef.current?.pause()
    setIsPlaying(isPaused)
  }

  // 音乐播放进度的function,属于是热调用，一秒内调用多次
  function handleTimeUpdata(): void {
    //当不是交互状态才开始
    if (!isChanging) {
      //获取当前播放时间
      const currentTime = audioRef.current!.currentTime * 1000
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrenttime(currentTime)
    }
  }

  function handleSliderChange(value: number): void {
    //时间更改
    setIsChanging(true)
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrenttime(currentTime)
    setProgress(value)
    console.log(value)
    setIsChanging(false)
  }

  return (
    <PlayerBarWrpper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            // onClick={() => handleChangeBtnClick(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            // onClick={() => handleChangeBtnClick()}
          ></button>
        </BarControl>
        <BarPlayInfo>
          <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 34)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="singer-name">{currentSong.name}</span>
              <span> </span>
              <span className="song-singer">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* 进度条是slider组件 */}
              <Slider
                value={progress}
                step={0.3}
                tooltip={{ formatter: null }}
                onChange={handleSliderChange}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator $playMode={1}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_player">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdata} />
    </PlayerBarWrpper>
  )
}

export default memo(AppPlayerBar)
