"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useRouter } from 'next/navigation'


export default function Home() {
  const [showButotn,setShowButton] = useState(false) 
  const [barbers,setBarbers] = useState([])
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const getBarbersHandler = async()=>{
      setLoading(true)
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/barbers`).then(res=>{
        setBarbers(res.data.results)
        setLoading(false)
        console.log(res.data)
      }).catch(err=>{
        setLoading(false)

        console.log(err,'my error')
      })
  }
  useEffect(()=>{
    setShowButton(true)
    getBarbersHandler()
    return ()=> setShowButton(false)
  },[])
  return (
    <div className={'barberMainContainer'}>
      <div></div>
      <div className="topWrraperInHome">
      <div className="barberMainContainer-searchBox" style={{cursor:'pointer',alignItems:"center"}} onClick={()=>{
        router.push('/barbers')
      }}>
        <div className="barberMainContainer-search__button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="barberMainContainer-search__button-svg">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

        </div>
       <p style={{color:"gray",margin:"auto 1rem",fontSize: "1.4rem"}}>Search barber</p>
        
      </div>
     {
      showButotn?<Link href={"/barbers"}>
       <div className="discoverButton fade-animation">
      <p className="discoverButton-text">Discover Now</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="discoverButton-svg">
<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

    </div>
    </Link>:null
     }
      </div>
      {
        loading? <div  style={{width:"100%",flexWrap:"nowrap", display:"flex",alignItems:"center"}}>
        {
          [1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,183].map(i=>{
            return (
              <div key={ i*3} className="lazyBg" style={{minWidth:200,height: 150,borderRadius: 10,margin: 10}}>
          <div style={{width:'100%',display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div className="lazyParentBg" style={{width:70,height: 70,borderRadius:"100%",marginTop: "-2rem"}}></div>
          </div>
          <div className="lazyParentBg" style={{marginTop: 15,width: "40%",margin:"auto",height: 10,borderRadius: 20}}></div>
        </div>
            )
          })
        }
   </div>: 
    <Marquee  delay={1}
    pauseOnHover
                style={{ fontSize: 10, marginTop: 5,justifyContent:"center",alignItems:"center",display:"flex"}}
               
   >
        {
          barbers.map((barber:any)=>{
            return (
              <div style={{background:"rgba(15, 13, 21, 1)",display:"flex",alignItems:"center",position:"relative",justifyContent:"space-between",height:"200px",borderRadius: 10,margin:10}}  key={barber.avatar}>
                 <div style={{display:'flex',alignItems:"center",paddingInline: 10}}>
                 <img  src={barber.avatar} alt={barber.slug} style={{width:"6rem",height: "6rem",borderRadius: 100,objectFit:"cover",marginTop: 10}}/>
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:'column',marginInline: 10}}>
                <p className="elipsise" style={{color:"white",fontFamily:"sans-serif",fontSize: 13}}>{barber.fullname}</p>
                <div style={{display:'flex',alignItems:'center',width:"85%",maxWidth:"85%",flexWrap:'wrap'}}>
                  <p style={{margin:"auto 0",color:"gray"}}>Services </p>
                  {
                    barber.services.map((service:any)=>{
                      return (
                        <p style={{margin: 5,color:"gray",whiteSpace:"nowrap"}}>#{service}</p>
                      )
                    })
                  }
                </div>
                </div>
                 </div>
                  <iframe   loading="lazy"
   style={{width:"300px",height: "100%", borderRadius:10,borderTopLeftRadius: 0,borderBottomLeftRadius: 0,border:"none",outline:"none"}} src={`https://www.google.com/maps?q=${barber.lat},${barber.lon}&hl=es;z=14&output=embed`} width="100%" title="description"></iframe>

              </div>
            )
          })
        }
</Marquee>

      }
    
    
    </div>
  );
}
