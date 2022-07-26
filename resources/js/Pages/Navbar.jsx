import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react'

 function Navbar ()  {
  return (
   
<Navbar bg="primary" variant="dark">
           
           <InertiaLink style={{color: "red"}}
               href="/"
               className="btn btn-primary">
               <img src={'./home.png'} />
           </InertiaLink>
           
           <InertiaLink href="/create" className="btn btn-primary">Εισαγωγή Νέου Φοιτητή</InertiaLink>
           <InertiaLink href="" className="btn btn-primary">Εισαγωγή Νέου Φοιτητή (Excel)</InertiaLink>
           </Navbar>
  )
}

export default Navbar ;


