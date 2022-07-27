import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useEffect, useState } from 'react'
import {  Navbar } from 'react-bootstrap';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import { format } from 'date-fns'
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const Foititis = (foitites, filters, tmima, user) => {
    const  {flash}  = usePage().props
    let i = 1;
    const [filter, setFilter] = useState(foitites.filters || '');
    let tmimata = foitites.tmima.map((tmima) => {
        return {
            label: tmima.name,
            value: tmima.name, 
            id: tmima.tmima_id
        }
    })

  

    useEffect(() => {
        if (filter) {
            Inertia.get(route(route().current()), { filter }, {
                preserveState: true,
                replace: true,
            });
        }
    }, [filter]);


    const submitExcel = (e) =>{
        e.preventDefault();
        const customHeadings = foitites.foitites.map(foititis=>({
            "ΟΝΟΜΑΤΕΠΩΝΥΜΟ": foititis.name,
            "AM": foititis.am ,
            "ΤΗΛΕΦΩΝΟ": foititis.phone,
            "EMAIL": foititis.email ,
            "ΑΦΜ": foititis.afm ,
            "ΑΜΚΑ": foititis.amka ,
            "ΗΜΕΡΟΜΗΝΙΑ ΕΝΑΡΞΗΣ": format(new Date(foititis.imerominia_enarxis), 'dd/MM/yyyy'),
            "ΗΜΕΡΟΜΗΝΙΑ ΛΗΞΗΣ": format(new Date(foititis.imerominia_lixis), 'dd/MM/yyyy'),
            "ΤΜΗΜΑ": foititis.tmima.name,
            "ΦΥΛΟ": foititis.gender.name,
            "ΦΟΡΕΑΣ": foititis.foreas.name

          }))
        var wb = XLSX.utils.book_new(),   
        ws = XLSX.utils.json_to_sheet((customHeadings)) ;
        bold = wb.add_format({'bold': True})
        XLSX.utils.book_append_sheet(wb,ws,"MySheet1");

        XLSX.writeFile(wb, "Foitites.xlsx");
    }
 


    return (
        
            <div >
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
            <div style={{color: "white"}}>
                
            <DropdownButton id="dropdown-basic-button" align="end" title={foitites.user }>
            <Dropdown.Item className="text-center"> <InertiaLink as="button" method="post" href={route('logout')} className="btn btn-primary">Εξοδος</InertiaLink> </Dropdown.Item>
            </DropdownButton>
           
            
            </div>
           
            </Nav>
            
           </Navbar>
            
            {flash.message && (
            <div className="alert alert-success alert alert-dismissible">
                    {flash.message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

            <div className="container mb-5  ">
                <div className="col-md-5 mx-auto">
                    <div class="form-group">
                        <div ><strong>Ονοματεπώνυμο</strong></div>

                        <div className="input-group">

                            <input className="form-control border " value={filter.name || ''} type="search" onChange={(e) => setFilter({ ...filter, name: e.target.value })} id="name" />
                        </div>
                    </div>

                    <div class="form-group">

                        <div className=""><strong>ΑΦΜ</strong></div>

                        <div className="input-group">
                            <input className="form-control border" value={filter.afm || ''} type="search" onChange={(e) => setFilter({ ...filter, afm: e.target.value })} id="imer" />
                        </div>
                    </div>

                    <div class="form-group">
                   
                        <div className=""><strong>Ημερομηνία Έναρξης</strong></div>

                        <div className="input-group">
                            <input className="form-control border " value={filter.starts_after || ''} type="date" onChange={(e) => setFilter({ ...filter, starts_after: e.target.value })} id="imerominia_enarxis" />
                        </div>
                    </div>

                    <div class="form-group">

                        <div className=""><strong>Ημερομηνία Λήξης</strong></div>

                        <div className="input-group">
                            <input className="form-control border " value={filter.starts_before || ''} type="date" onChange={(e) => setFilter({ ...filter, starts_before: e.target.value  })} id="tmima_id" />
                        </div>
                    </div>

                    <div className='form-group'>
                 
                        <div className=""><strong>Τμήμα</strong></div>
                        
                        <Select  options={tmimata}  onChange={(option)=> setFilter({ ...filter, tmima_id: option.id })}></Select>
                      
                    </div>
                    <form onSubmit={submitExcel}>
                    <div className='text-center'> <button type="submit" className="btn btn-success text-center">Εξαγωγή Excel</button></div>
                    </form>

                </div>


            </div>
            
            

            <div className="table-responsive">
                <table className="table">

                    <thead className="table-primary">
                        <tr>
                            <th scope="col" className="">#</th>
                            <th scope="col" className="">ΟΝΟΜΑΤΕΠΩΝΥΜΟ</th>
                            <th scope="col" className="">ΑΜ</th>
                            <th scope="col" className="">ΤΗΛΕΦΩΝΟ</th>
                            <th scope="col" className="">EMAIL</th>
                            <th scope="col" className="">ΑΦΜ</th>
                            <th scope="col" className="">ΑΜΚΑ</th>
                            <th scope="col" className="">ΗΜΕΡΟΜΗΝΙΑ ΕΝΑΡΞΗΣ</th>
                            <th scope="col" className="">ΗΜΕΡΟΜΗΝΙΑ ΛΗΞΗΣ</th>
                            <th scope="col" className="">ΤΜΗΜΑ</th>
                            <th scope="col" className="">ΦΟΡΕΑΣ</th>
                            <th scope="col" className="">ΦΥΛΟ</th>
                            <th scope="col" className="">ΕΝΕΡΓΕΙΕΣ</th>
                        </tr>
                    </thead >
                    <tbody>
                        {foitites.foitites.map((foititis) => (
                 

                            <tr key={foititis.id}>

                                <td className="">{i++}</td>
                                <td className="">{foititis.name}</td>
                                <td className="">{foititis.am}</td>
                                <td className=""> {foititis.phone}</td>
                                <td className=""> {foititis.email}</td>
                                <td className=""> {foititis.afm}</td>
                                <td className=""> {foititis.amka}</td>
                                <td className=""> {format(new Date(foititis.imerominia_enarxis), 'dd/MM/yyyy') }</td>
                                <td className=""> {format(new Date(foititis.imerominia_lixis), 'dd/MM/yyyy') }</td>
                                <td className=""> {foititis.tmima.name}</td>
                                <td className=""> {foititis.foreas.name}</td>
                                <td className=""> {foititis.gender.name}</td>

                               

                                <td><InertiaLink href={route("edit", foititis.id)} className='btn btn-primary'>Επεξεργασία</InertiaLink>
                                    <InertiaLink href={route("delete", foititis.id)} className='btn btn-danger'>Διαγραφή</InertiaLink></td>
                            </tr>

                        ))}
                        {foitites.length === 0 && (
                            <tr>
                                <td
                                    className="px-6 py-4 border-t"
                                    colSpan="4"
                                >
                                    No foitites found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>

    )
}
export default Foititis;
