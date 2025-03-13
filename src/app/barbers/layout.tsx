"use client"
import Image from "next/image"
import profilePic from '../../../public/user-profile.png'
const BarberLayout = ({children,}: Readonly<{ children: React.ReactNode;}>)=>{

    
        return (
            <div className="barbersListLayout">
                <div className="barbersListLayout-sidebar">
              <div style={{width:"100%",padding: 7.5}}>
              <div className="barberMainContainer-searchBox" style={{width:"100%"}}>
        <div className="barberMainContainer-search__button" style={{width:"2.3rem",height:"2.3rem"}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="barberMainContainer-search__button-svg" style={{width:"1.3rem",height:"1.3rem"}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

        </div>
        <input type="search" className="barberMainContainer-searchBox__input" placeholder="Search barber ..." style={{fontSize: 14}}/>
        
      </div>
              </div>
      <div className="divider-text">
        <div style={{flex:1,height: 1,background:"rgb(105, 105, 105)"}}></div>
        <span style={{color:"white",paddingInline: 10}}>Filters</span>
        <div style={{flex:1,height: 1,background:"rgb(105, 105, 105)"}}></div>
      </div>
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
                    {children}
                    </div>
                   
                </div>

            </div>
        )
}

export default BarberLayout