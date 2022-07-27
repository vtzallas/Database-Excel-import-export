import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import React, { Fragment, useState } from 'react'
import Select from 'react-select';
import { Nav, Navbar } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Create = ({tmima,foreas,gender,errors}) => {


    //ΛΙΣΤΕΣ ΕΤΟΙΜΕΣ ΤΜΗΜΑΤΩΝ ΦΥΛΟΥ ΚΑΙ ΦΟΡΕΩΝ ΓΙΑ ΤΑ DROPDOWN

    let tmimata=tmima.map((tmima)=>{
        return {label: tmima.name ,
        id:tmima.tmima_id,value:tmima.name}

})

let foreis=foreas.map((foreas)=>{
    return {label: foreas.name ,
    id:foreas.foreas_id,value:foreas.name}

})

let genders=gender.map((gender)=>{
    return {label: gender.name ,
    id:gender.gender_id,value:gender.name}

})

//ARXIKOPOIHSH TΩΝ ΠΕΔΙΩΝ

    const[name,setName] = useState('');
    const[am,setAm] = useState('');
    const[phone,setPhone] = useState('');
    const[email,setEmail] = useState('');
    const[afm,setAfm] = useState('');
    const[amka,setAmka] = useState('');
    const[imerominia_enarxis,setImerominia_enarxis] = useState('');
    const[imerominia_lixis,setImerominia_lixis] = useState('');
    const[tmima_id,setTmima_id] = useState('');
    const[foreas_id,setForeasid] = useState('');
    const[gender_id,setGender_id] = useState('');




   
     const saveData = (e) =>{
        e.preventDefault();
        Inertia.post('/save',{name,am,phone,email,afm,amka,imerominia_enarxis,imerominia_lixis,tmima_id,foreas_id,gender_id})
}

       

    
    return (
        <Fragment>
            <div>
    
    
     </div>
     <Navbar bg="primary" variant="dark">
           
     <Nav className='me-auto'>
           <InertiaLink 
               href="/"
               className="btn btn-primary">
                <img src={'../home.png'} />
           </InertiaLink>
           
           <InertiaLink href="/create" className="btn btn-primary">Εισαγωγή Νέου Φοιτητή</InertiaLink>
           <InertiaLink href="/file-import-export" className="btn btn-primary">Εισαγωγή Φοιτητών μέσω Excel</InertiaLink>
           </Nav>
           <Nav className="ml-auto">
           <DropdownButton id="dropdown-basic-button" align="end" title={foitites.user }>
            <Dropdown.Item className="text-center"> <InertiaLink as="button" method="post" href={route('logout')} className="btn btn-primary">Εξοδος</InertiaLink> </Dropdown.Item>
            </DropdownButton>
            </Nav>
           </Navbar>
            <h1>Εισαγωγή Νέου Φοιτητή</h1>
            <div className='card'>
                <div className='card-body'>
                    
                    {JSON.stringify(errors)}
                    <form onSubmit={saveData}>
                        
                        <div className='form-group'>
                            <label htmlFor="name">Ονοματεπώνυμο</label>
                            <input
                                type="text"
                                className='form-control'
                                id="name"
                                value={name}
                                onChange={e=>setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="am">ΑΜ</label>
                            <input
                                type="text"
                                className='form-control'
                                id="am"
                                value={am}
                                onChange={e=>setAm(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="phone">Τηλέφωνο</label>
                            <input
                                type="text"
                                className='form-control'
                                id="phone"
                                value={phone}
                                onChange={e=>setPhone(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className='form-control'
                                id="email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="afm">AΦΜ</label>
                            <input
                                type="text"
                                className='form-control'
                                id="afm"
                                value={afm}
                                onChange={e=>setAfm(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="amka">ΑΜΚΑ</label>
                            <input
                                type="text"
                                className='form-control'
                                id="amka"
                                value={amka}
                                onChange={e=>setAmka(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="imerominia_enarxis">Ημερομηνία Εναρξης</label>
                            <input
                                type="date"
                                className='form-control'
                                id="imerominia_enarxis"
                                value={imerominia_enarxis}
                                onChange={e=>setImerominia_enarxis(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="imerominia_lixis">Ημερομηνία Λήξης</label>
                            <input
                                type="date"
                                className='form-control'
                                id="imerominia_lixis"
                                value={imerominia_lixis}
                                onChange={e=>setImerominia_lixis(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label > Τμήμα</label>
                            {/* <Select id={tmimata.id}  options={tmimata}  /> */}
                            <Select options={tmimata} onChange={(option) => setTmima_id(option.id)}></Select>
                         
                        </div>

                        <div className='form-group'>
                            <label > Φορέας</label>
                            {/* <Select id={tmimata.id}  options={tmimata}  /> */}
                            <Select options={foreis} onChange={(option) => setForeasid(option.id)}></Select>
                         
                        </div>

                        <div className='form-group'>
                            <label > Φύλο</label>
                            {/* <Select id={tmimata.id}  options={tmimata}  /> */}
                            <Select options={genders} onChange={(option) => setGender_id(option.id)}></Select>
                         
                        </div>
                        <button type="submit" className='btn btn-primary' >Αποθήκευση</button>
                    </form>

                </div>


            </div>
        </Fragment>
    )
}

export default Create;