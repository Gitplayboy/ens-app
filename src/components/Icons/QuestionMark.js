import React from 'react'
import styled from 'react-emotion'
import Icon from './IconBase'

const SVG = styled(Icon)``
const QuestionMark = ({ active }) => (
  <SVG active={active} width="22" height="22">
    <path
      d="M14.0016,10.5659 C13.8116,10.9359 13.5846,11.2359 13.3206,11.4679 C13.0566,11.7009 12.7906,11.9329 12.5216,12.1649 C12.2516,12.3979 12.0226,12.6769 11.8326,13.0039 C11.6426,13.3319 11.5466,13.7069 11.5466,14.1289 L9.9006,14.1129 C9.9006,13.5539 9.9956,13.0679 10.1856,12.6559 C10.3756,12.2439 10.6056,11.9179 10.8746,11.6739 C11.1436,11.4319 11.4096,11.2049 11.6736,10.9929 C11.9376,10.7819 12.1646,10.5369 12.3546,10.2569 C12.5446,9.9779 12.6396,9.6579 12.6396,9.2989 C12.6396,8.8239 12.4866,8.4409 12.1806,8.1509 C11.8746,7.8609 11.4466,7.7149 10.8976,7.7149 C10.2536,7.7149 9.7546,7.8619 9.4016,8.2359 C9.0476,8.6109 8.8716,8.7869 8.8716,9.7869 L7.2246,9.7869 C7.2246,8.7869 7.5616,7.7849 8.2376,7.1199 C8.9136,6.4549 9.7996,6.1429 10.8976,6.1429 C11.9636,6.1429 12.7956,6.4459 13.3926,7.0319 C13.9886,7.6179 14.2866,8.3749 14.2866,9.2939 C14.2866,9.7689 14.1916,10.1959 14.0016,10.5659 M11.5556,17.2879 C11.3176,17.5149 11.0346,17.6279 10.7086,17.6279 C10.3696,17.6279 10.0876,17.5149 9.8606,17.2879 C9.6336,17.0609 9.5206,16.7889 9.5206,16.4729 C9.5206,16.1559 9.6336,15.8809 9.8606,15.6489 C10.0876,15.4169 10.3696,15.3009 10.7086,15.3009 C11.0346,15.3009 11.3176,15.4169 11.5556,15.6489 C11.7926,15.8809 11.9116,16.1559 11.9116,16.4729 C11.9116,16.7889 11.7926,17.0609 11.5556,17.2879 M10.6756,0.6499 C4.7796,0.6499 -0.0004,5.4289 -0.0004,11.3249 C-0.0004,17.2209 4.7796,21.9999 10.6756,21.9999 C16.5706,21.9999 21.3506,17.2209 21.3506,11.3249 C21.3506,5.4289 16.5706,0.6499 10.6756,0.6499"
      id="Fill-1"
      fill="#C7D3E3"
    />
  </SVG>
)

export default QuestionMark
