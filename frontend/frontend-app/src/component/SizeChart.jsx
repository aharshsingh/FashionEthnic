import React, {useState, useEffect} from 'react'
import womenSizechart from '../photo/Women_sizechart.jpg';
import menSizeChart from '../photo/menwebcom.jpg';
import crossImg from '../photo/xmark-solid (1).svg';
import {useParams, useNavigate} from 'react-router-dom';
import '../component-css/SizeChart.css'
export default function SizeChart() {
    const navigate = useNavigate();
    const params = useParams();
    const [gender, setGender] = useState('');
    useEffect(()=>{
        setGender(params.gender);
    },[params.gender])
    const handleClick = ()=>{
        navigate(-1);
      }
  return (
    <div>
        <div className='flex justify-end mt-4'>
            <img className='w-6 h-6' src={crossImg} onClick = { handleClick } alt="logo"/>
        </div>
        {gender ==='male' ?
            (<div className='flex justify-center items-center '><img className='sizeChartImageM' src={menSizeChart} alt='sizeChart' /></div>) :
            (<div className='flex justify-center items-center '><img className='sizeChartImageW' src={womenSizechart} alt='sizeChart' /></div>)
        }
    </div>
  )
}
