import styled from 'styled-components'

export const AlbumWrapper = styled.div`
  margin-top: 50px;

  .content {
    height: 186px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    margin: 20px 0 37px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; /* 新增：为绝对定位子元素提供参照 */

    .arrow {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }

    .arrow-left {
      background-position: -260px -75px;
      &:hover {
        background-position: -280px -75px;
      }
    }

    .arrow-right {
      background-position: -300px -75px;
      &:hover {
        background-position: -320px -75px;
      }
    }

    .banner {
      overflow: hidden;
      flex: 1;
      position: absolute;
      left: 30px;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      height: 150px;
      display: block;
      justify-content: center;
      align-items: center;

      .album-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  /* .album {
    width: 640px;
    height: 150px;

    .ant-carousel .slick-slide {
      height: 150px;
      overflow: hidden;
    }

    .page {
      display: flex !important;
      justify-content: space-between;
      align-items: center;
    }
  } */
`
