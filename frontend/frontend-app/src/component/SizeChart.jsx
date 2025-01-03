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
    },[])
    const handleClick = ()=>{
        navigate(-1);
      }
  return (
    <div>
        <div>
            <img className='crossImg' src={crossImg} onClick = { handleClick } alt="logo"/>
        </div>
        {gender ==='male' ?
            (<img className='sizeChartImageM' src={menSizeChart} alt='sizeChart' />) :
            (<img className='sizeChartImageW' src={womenSizechart} alt='sizeChart' />)
        }
    </div>
  )
}
