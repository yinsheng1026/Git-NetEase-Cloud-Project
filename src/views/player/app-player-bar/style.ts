import styled from 'styled-components'

export const PlayerBarWrpper = styled.div`
  position: fixed; // 固定定位，元素脱离文档流，相对于浏览器窗口进行定位
  z-index: 99; // 设置堆叠层级为99，确保元素显示在最上层
  left: 0; // 左边缘与窗口左边缘对齐
  right: 0; // 右边缘与窗口右边缘对齐，与left:0结合实现宽度100%效果
  bottom: 0; // 下边缘与窗口底部对齐，实现底部固定效果
  height: 52px; // 设置元素高度为52像素
  background-position: 0 0; // 背景图片从左上角(0,0)位置开始显示
  background-repeat: repeat; // 背景图片在水平和垂直方向重复平铺
  .content {
    display: flex; // 启用弹性盒子布局，子元素将在一行内排列
    align-items: center; // 子元素在交叉轴（垂直方向）上居中对齐
    justify-content: space-between; // 子元素在主轴上两端对齐，平均分布剩余空间
    position: absolute; // 绝对定位，相对于最近的非static定位的父元素定位
    left: 50%; // 元素左边缘移动到父元素水平方向的50%位置
    transform: translateX(-50%); // 元素向左平移自身宽度的50%，实现水平居中
    bottom: 0; // 元素底部与父元素底部对齐
    height: 47px; // 设置元素高度为47像素
  }
`
//左边播放控制相关
interface IBarControl {
  // 储存是否播放状态
  isPlaying: boolean
}
export const BarControl = styled.div<IBarControl>`
  display: flex; // 启用弹性布局，子元素水平排列
  align-items: center; // 子元素在交叉轴（垂直方向）上居中对齐

  .prev,
  .next {
    width: 28px; // 设置宽度为28像素
    height: 28px; // 设置高度为28像素
    cursor: pointer; // 鼠标悬停时显示手型光标，表示可点击
  }

  .prev {
    background-position: 0 -130px; // 背景图片水平位置0，垂直位置-130px（雪碧图技术）
  }

  .btn {
    cursor: pointer;
  }

  .play {
    width: 36px; // 播放按钮宽度36px，比前后按钮稍大
    height: 36px; // 播放按钮高度36px
    margin: 0 8px; // 左右外边距各8px，与前后按钮保持间距
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')}; // 根据播放状态动态切换背景图位置
  }

  .next {
    background-position: -80px -130px; // 背景图片水平位置-80px，垂直位置-130px
  }
`

//播放信息相关
export const BarPlayInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 8px;
      left: 8px;

      .singer-name {
        color: #a1a1a1;
        margin-left: 0px;
      }
      .song-singer {
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;
      .ant-slider {
        position: relative; // 相对定位，为内部元素定位提供参考基准
        top: 0px; // 向上微调3像素，用于垂直方向的位置精细调整
        width: 493px; // 设置滑块组件总宽度为493像素
        margin-right: 10px; // 右侧外边距10像素，与其他元素保持间距
        .ant-slider-rail {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')}) right 0;
        }
        .ant-slider-track {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')})
            left -66px;
        }
        .ant-slider-handle {
          border: none;
          margin-top: 0px;
        }
      }
      .time {
        .current {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`
//右边的控制
interface IBarOperator {
  playMode: number
}
export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    background: url(${require('@/assets/img/pip_icon.png')});
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }

    .loop {
      background-position: ${(props) => {
        switch (props.playMode) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
    }
  }
`
