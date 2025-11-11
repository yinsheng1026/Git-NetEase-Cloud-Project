//模板

import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, PlayerBarWrpper } from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { useAppDispatch, UseAppSelect } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { getPlayerUrl } from '@/utils/handle-player'
import { shallowEqual } from 'react-redux'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction
} from '../store/player'
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

  // const [playMode, setPlayMode] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentSong, lyrics, lyricIndex, playMode } = UseAppSelect(
    (state) => ({
      currentSong: state.player.currentSong,
      //获取歌词
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    //只有发生改变才获取该值
    shallowEqual
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.1
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
    //歌词追踪逻辑
    let index = lyrics.length - 1 //默认最后一句，避免加载不出来
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    //避免多次赋值：
    if (lyricIndex === index || index === -1) return
    //当匹配上歌词索引后匹配起来（保存在slice中）
    dispatch(changeLyricIndexAction(index))
    // alert(lyrics[index].content)
    console.log(lyrics[index].content)
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

  function handleChangePlayMode(): void {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  //上一首下一首
  function handleChangeBtnClick(isNext = true): void {
    dispatch(changeMusicAction(isNext))
  }

  function handleTimeEnded(): void {
    //单曲循环时候
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    }
    //当不是单曲循环的时候
    else {
      handleChangeBtnClick(true)
    }
  }

  return (
    <PlayerBarWrpper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeBtnClick(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeBtnClick()}
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
        <BarOperator $playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_player">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdata}
        onEnded={handleTimeEnded}
      />
    </PlayerBarWrpper>
  )
}

export default memo(AppPlayerBar)
