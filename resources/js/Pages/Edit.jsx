import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { set } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react'
import Select from 'react-select';

const Edit = ({foititis,tmima,gender,foreas,success,error}) => {

  
   
    const[name,setName] = useState('');
    const[am,setAm] = useState('');
    const[phone,setPhone] = useState('');
    const[email,setEmail] = useState('');
    const[afm,setAfm] = useState('');
    const[amka,setAmka] = useState('');
    const[imerominia_enarxis,setImerominia_enarxis] = useState('');
    const[imerominia_lixis,setImerominia_lixis] = useState('');
    let[epilegmenoTmima,setEpilegmenoTmima] = useState({label:String(foititis.tmima.name),value:foititis.tmima.name});
    let[epilegmenoFylo,setEpilegmenoFylo] = useState({label:String(foititis.gender.name),value:foititis.gender.name});
    let[epilegmenoForea,setEpilegmenoForea] = useState({label:String(foititis.foreas.name),value:foititis.foreas.name});
    const[tmima_id,setTmima_id] = useState('');
    const[gender_id,setGender_id] = useState('');
    const[foreas_id,setForeas_id] = useState('');


    useEffect(() => {
      
        setName(foititis.name);
        setAm(foititis.am);
        setPhone(foititis.phone);
        setEmail(foititis.email);
        setAfm(foititis.afm);
        setAmka(foititis.amka);
        setImerominia_enarxis(foititis.imerominia_enarxis);
        setImerominia_lixis(foititis.imerominia_lixis);
        setTmima_id(foititis.tmima_id);
        setGender_id(foititis.gender_id);
        setForeas_id(foititis.foreas_id);

        
    },[]);
    
    let tmimata=tmima.map((tmima)=>{
        return {label: tmima.name ,
      value:tmima.name ,id:tmima.tmima_id}
    })

    let foreis=foreas.map((foreas)=>{
        return {label: foreas.name ,
        id:foreas.foreas_id,value:foreas.name}
    
    })
    
    let genders=gender.map((gender)=>{
        return {label: gender.name ,
        id:gender.gender_id,value:gender.name}
    
    })


   
   
    const updateTmimaValue = (option) =>{
         setTmima_id(option.id)
         setEpilegmenoTmima=(option)

    }

    const updateGenderValue = (option) =>{
        setGender_id(option.id)
        setEpilegmenoFylo=(option)

   }

   const updateForeaValue = (option) =>{
    setForeas_id(option.id)
    setEpilegmenoForea=(option)

}
    
     const updateUser = (e) =>{
        e.preventDefault();
        Inertia.post(route("update", foititis.id),{name,am,phone,tmima_id,email,afm,amka,imerominia_enarxis,imerominia_lixis,gender_id,foreas_id});
     }

    
    return (
        
        <Fragment>
         
            <InertiaLink href="/" className="btn btn-primary">Σύνολο Φοιτητών</InertiaLink>
            <h1>Eπικαιροποίηση στοιχείων</h1>
            {success && <div className="alert alert-success">{success}</div>}
            
           
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={updateUser}>
                        
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
                            <label htmlFor="name">ΑΜ</label>
                            <input
                                type="text"
                                className='form-control'
                                id="am"
                                value={am}
                                onChange={e=>setAm(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Τηλέφωνο</label>
                            <input
                                type="text"
                                className='form-control'
                                id="phone"
                                value={phone}
                                onChange={e=>setPhone(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Email</label>
                            <input
                                type="email"
                                className='form-control'
                                id="email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">AΦΜ</label>
                            <input
                                type="text"
                                className='form-control'
                                id="afm"
                                value={afm}
                                onChange={e=>setAfm(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">ΑΜΚΑ</label>
                            <input
                                type="text"
                                className='form-control'
                                id="amka"
                                value={amka}
                                onChange={e=>setAmka(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Ημερομηνία Εναρξης</label>
                            <input
                                type="date"
                                className='form-control'
                                id="imerominia_enarxis"
                                value={imerominia_enarxis}
                                onChange={e=>setImerominia_enarxis(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Ημερομηνία Λήξης</label>
                            <input
                                type="date"
                                className='form-control'
                                id="imerominia_lixis"
                                value={imerominia_lixis}
                                onChange={e=>setImerominia_lixis(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="select"> Τμήμα</label>
                          
                            <Select options={tmimata} defaultValue={epilegmenoTmima}  onChange={updateTmimaValue}></Select>
                         
                        </div>

                        <div className='form-group'>
                            <label htmlFor="name"> Φορέας</label>
                       
                            <Select options={foreis} defaultValue={epilegmenoForea}  onChange={updateForeaValue}></Select>
                         
                        </div>

                        <div className='form-group'>
                            <label htmlFor="name"> Φύλο</label>
                           
                            <Select options={genders} defaultValue={epilegmenoFylo} onChange={updateGenderValue}></Select>
                         
                        </div>
                        <button type="submit" className='btn btn-primary' >Αλλαγή Στοιχείων</button>
                    </form>

                </div>


            </div>
        </Fragment>
    )
}

export default Edit;