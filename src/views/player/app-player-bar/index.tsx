//模板

import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, PlayerBarWrpper } from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { UseAppSelect } from '@/store'
import { getImageSize } from '@/utils/format'
import { getPlayerUrl } from '@/utils/handle-player'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}
const AppPlayerBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentSong } = UseAppSelect(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    shallowEqual
  )

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = getPlayerUrl(currentSong.id)
    audioRef.current
      .play()
      .then(() => {
        console.log('播放成功')
        setIsPlaying(true)
      })
      .catch((err) => {
        console.log('播放失败:', err)
        setIsPlaying(false)
      })
    // setDuration(currentSong.dt)
  }, [currentSong])

  function handlePlayBtnClick() {
    const isPaused = audioRef.current!.paused
    isPaused
      ? audioRef.current?.play().catch(() => setIsPlaying(false))
      : audioRef.current?.pause()
    setIsPlaying(isPaused)
  }
  return (
    <PlayerBarWrpper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
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
              src={getImageSize(currentSong.al.picUrl, 34)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="singer-name">{currentSong.name}</span>
              <span> </span>
              <span className="song-singer">{currentSong.ar[0].name}</span>
            </div>
            <div className="progress">
              {/* 进度条是antd组件 */}
              <Slider />
              <div className="time">
                <span className="current">0.25</span>
                <span className="divider">/</span>
                <span className="duration">04.35</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator playMode={1}>
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
      <audio
        ref={audioRef}
        // onTimeUpdate={handleTimeUpdate}
        // onEnded={handlePlayEnded}
      />
    </PlayerBarWrpper>
  )
}

export default memo(AppPlayerBar)
