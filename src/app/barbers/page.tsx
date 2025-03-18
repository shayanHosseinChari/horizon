"use client" 

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import profilePic from '../../../public/user-profile.png'
import axios from 'axios'
import IBarber from '@/interfaces/IBarber'
import IService from '@/interfaces/IService'

import Marquee from 'react-fast-marquee'


const BarBers = ()=>{
    const [isAllBarbers,setIsAllBarbers] = useState(true)
    const [allBarbers,setBarbers] = useState<any>([])
    const [loading,setLoading] = useState(false)
    const [services,setServices] = useState([])
    const [copyBarbers,setCopyBarbers] = useState<any>([])
    const [selectedServices,setSelectedService] = useState<any>([])
    const [searchValue,setSearchValue] = useState('')
    const checkServiecSelecttion = (item:any)=>{

        var  a = selectedServices.filter((i:any)=>{
            return i.title == item.title
        })
        if(a.length>0){
            return true
        }else{
            return false
        }

    }
    const RenderArray = (len:number)=>{
    var genratedArray=[]
    for(var i=0;i<len;i++){
        genratedArray.push(i)
    }
    return genratedArray
}
    const getBarbersHandler = async()=>{
        setLoading(true)
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/barbers`).then(res=>{
          setBarbers(res.data.results)
          setCopyBarbers(res.data.results)
          setLoading(false)
          console.log(res.data)
        }).catch(err=>{
          setLoading(false)
  
          console.log(err,'my error')
        })
    }
    const searchHandler = ()=>{
       
        let founedBarbers:any = []
        copyBarbers.map((i:IBarber)=>{
            if(i.fullname.toLowerCase().includes(searchValue.toLowerCase())){
                founedBarbers.push(i)
            }
        })
        setBarbers(founedBarbers)
    }
    const getSerivcesHandler = async()=>{
        setLoading(true)
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/services`).then(res=>{
         
          setServices(res.data.results)
        }).catch(err=>{
          setLoading(false)
  
          console.log(err,'my error')
        })
    }
    useEffect(()=>{
        getBarbersHandler()
        getSerivcesHandler()
    },[])
    const filterBarbersHandler = ()=>{
            let filteredBarbers:any =[];
            copyBarbers.forEach((barber:any)=>{
                for (var i = 0;i<selectedServices.length;i++){
                    let flag = false
                    if(barber.services.includes(selectedServices[i]?.title)){
                        filteredBarbers.push(barber)
                        return;
                    }else{
                        flag = false
                      
                    }
                    if(flag){
                       
                    }
                }
            })
            console.log(filteredBarbers,'founded')
            setBarbers(filteredBarbers)
    }
    useEffect(()=>{
        if(selectedServices.length>0){
            filterBarbersHandler()
        }else{
            setBarbers(copyBarbers)
        }
    },[selectedServices])
    return (
        <div className="barbersListLayout">
        <div className="barbersListLayout-sidebar">
      <div style={{width:"100%",padding: 7.5}}>
      <div className="barberMainContainer-searchBox" style={{width:"100%"}}>
<div className="barberMainContainer-search__button" onClick={()=>{
    searchHandler()
}} style={{cursor:"pointer", width:"2.3rem",height:"2.3rem"}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="barberMainContainer-search__button-svg" style={{width:"1.3rem",height:"1.3rem"}}>
<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

</div>
<input type="search" value={searchValue} className="barberMainContainer-searchBox__input" placeholder="Search barber ..." style={{fontSize: 14}} onChange={(e)=>{
   if(e.target.value){
    setSearchValue(e.target.value)
   }else{
    setSearchValue('')
    setBarbers(copyBarbers)
   }
}}/>

</div>
      </div>
<div className="divider-text">
<div style={{flex:1,height: 1,background:"rgb(105, 105, 105)"}}></div>
<span style={{color:"white",paddingInline: 10}}>Filters</span>
<div style={{flex:1,height: 1,background:"rgb(105, 105, 105)"}}></div>
</div>
<div className="sidebarFilterItemsIsShopOrNot">
<div className={isAllBarbers?"sidebarFilterItemsIsShopOrNot-item sidebarFilterItemsIsShopOrNot-item--active":"sidebarFilterItemsIsShopOrNot-item"} onClick={()=>{
    setIsAllBarbers(true)
}}>
  <p className="sidebarFilterItemsIsShopOrNot-item__text">All</p>
</div>
<div className={isAllBarbers?"sidebarFilterItemsIsShopOrNot-item":"sidebarFilterItemsIsShopOrNot-item sidebarFilterItemsIsShopOrNot-item--active"} onClick={()=>{
    setIsAllBarbers(false)
}}>
  <p className="sidebarFilterItemsIsShopOrNot-item__text">Personal hairdresser</p>
</div>
</div>
{
    selectedServices.length>1?<div className='deleteServicesButotn' onClick={()=>{
        setSelectedService([])
        setBarbers(copyBarbers)
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="deleteServicesButotn-svg">
      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
    </svg>
    <p className='deleteServicesButotn-text'>Delete all</p>
    
    </div>:null
}
{
    services.length>0?
    <div className='sidebarServicesWrraper'>
        {
            services.map((i:IService)=>{
                return (
                    <div className={checkServiecSelecttion(i)?'sidebarServicesWrraper-item fade-animation sidebarServicesWrraper-item--active':'sidebarServicesWrraper-item fade-animation'} onClick={()=>{
                        
                        if(checkServiecSelecttion(i)){
                            console.log('slected serviced and remove')
                            var a= selectedServices.filter((service:any)=>{
                                return service.title != i.title
                            })
                            setSelectedService(a)
                        }else{
                            console.log('add service')

                            let a:any = [...selectedServices]
                            var s:IService = i
                            a.push(s)
                            setSelectedService(a)
                        }
                    }}>
                        {
                            i.icon?<img src={i.icon}/>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="sidebarServicesWrraper-item__svg">
                            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                          </svg>
                          
                        }
                        <p className='sidebarServicesWrraper-item__text'>{i.title}</p>
                    </div>
                )
            })
        }
    </div>:null
}
        </div>
        <div className="barbersListLayout-contentWrraper">
            <div className="barbersListLayout-topBar">
            <Image
src={profilePic}
alt=""
className="barbersListLayout-topBar__img"
/>
                
                <p className="barbersListLayout-topBar__text">Shayn chr</p>
            </div>
            <div className="barbersListLayout-content hideScroll">
            {
                allBarbers.length>0?<>

                    {
                        allBarbers?.map((i:IBarber)=>{
                          if(isAllBarbers){
                            return (
                                <div className='searchPageBarberItem fade-animation' >
                                    <div className='searchPageBarberItem-avatarWrraper'>
                                    <div style={{position:"relative"}}>
                                    <img src={i.avatar} className='searchPageBarberItem__avatar'/>
                                   {
                                    i.rate == 0? <div className='ratedWrrapers'>
                                    {
                                        [1,2,3,4,5].map(rate=>{
                                            return (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ratedWrrapers-rate" style={{color:"gray"}}>
<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

                                            )
                                        })
                                    }
                                </div>: <div className='ratedWrrapers'>
                                    {
                                        RenderArray(i.rate).map(rate=>{
                                            return (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ratedWrrapers-rate">
<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

                                            )
                                        })
                                    }
                                </div>
                                   }
                                    </div>
                                    </div>
                                    <div className='searchPageBarberItem-title'>
                                        <p className='searchPageBarberItem-content__fullName elipsis'>{i.fullname}</p>

                                    </div>
                                   <div style={{display:"flex",flexWrap:"nowrap",alignItems:'center'}}>
                                    <p style={{margin:"auto 0.4rem",fontSize: 15,color:"gray",whiteSpace:"nowrap",fontFamily:"sans-serif"}}>Services : </p>
                                    <Marquee delay={1} style={{
                                        width:"100%",
                                        display:"flex",
                                        alignItems:"center",

                                        marginTop: 10
                                    }}
                                    autoFill
                                    gradient
                                    gradientColor='rgb(13, 12, 16)'
                                    >

                                        {
                                            i.services.map((s:any)=>{
                                                return (
                                                    <p style={{color:"rgba(164, 164, 164, 1)",fontFamily:"sans-serif",marginInline: 10}}>#{s}</p>
                                                )
                                            })
                                        }

                                    </Marquee>
                                   </div>
                                 <div style={{width:"100%",marginTop: 10}}>
                                 <iframe   loading="lazy"
   style={{width:"100%",height: "100%",borderRadius:10,border:"none",borderTopLeftRadius:"unset",borderTopRightRadius:"unset" ,outline:"none"}} src={`https://www.google.com/maps?q=${i.lat},${i.lon}&hl=es;z=14&output=embed`} width="100%" title="description"></iframe>
                                 </div>
                                </div>
                            )
                          }else{
                            if(i.is_shop == false){
                                return (
                                    <div className='searchPageBarberItem fade-animation' >
                                        <div className='searchPageBarberItem-avatarWrraper'>
                                        <div style={{position:"relative"}}>
                                        <img src={i.avatar} className='searchPageBarberItem__avatar'/>
                                       {
                                        i.rate == 0? <div className='ratedWrrapers'>
                                        {
                                            [1,2,3,4,5].map(rate=>{
                                                return (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ratedWrrapers-rate" style={{color:"gray"}}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
    
                                                )
                                            })
                                        }
                                    </div>: <div className='ratedWrrapers'>
                                        {
                                            RenderArray(i.rate).map(rate=>{
                                                return (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ratedWrrapers-rate">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
    
                                                )
                                            })
                                        }
                                    </div>
                                       }
                                        </div>
                                        </div>
                                        <div className='searchPageBarberItem-title'>
                                            <p className='searchPageBarberItem-content__fullName elipsis'>{i.fullname}</p>
    
                                        </div>
                                       <div style={{display:"flex",flexWrap:"nowrap",alignItems:'center'}}>
                                        <p style={{margin:"auto 0.4rem",fontSize: 15,color:"gray",whiteSpace:"nowrap",fontFamily:"sans-serif"}}>Services : </p>
                                        <Marquee delay={1} style={{
                                            width:"100%",
                                            display:"flex",
                                            alignItems:"center",
    
                                            marginTop: 10
                                        }}
                                        autoFill
                                        gradient
                                        gradientColor='rgb(13, 12, 16)'
                                        >
    
                                            {
                                                i.services.map((s:any)=>{
                                                    return (
                                                        <p style={{color:"rgba(164, 164, 164, 1)",fontFamily:"sans-serif",marginInline: 10}}>#{s}</p>
                                                    )
                                                })
                                            }
    
                                        </Marquee>
                                       </div>
                                     <div style={{width:"100%",marginTop: 10}}>
                                     <iframe   loading="lazy"
       style={{width:"100%",height: "100%",borderRadius:10,border:"none",borderTopLeftRadius:"unset",borderTopRightRadius:"unset" ,outline:"none"}} src={`https://www.google.com/maps?q=${i.lat},${i.lon}&hl=es;z=14&output=embed`} width="100%" title="description"></iframe>
                                     </div>
                                    </div>
                                )
                            }
                          }
                        })
                    }
                </>:<p></p>
            }
            </div>
           
        </div>

    </div>
    )
}

export default BarBers