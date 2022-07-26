import React, { Fragment } from 'react'
import { Navbar } from 'react-bootstrap';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaLink} from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import Form  from 'react-bootstrap/Form';



const Excel = () => {
    const { flash , errors } = usePage().props
    const { data, setData, post, progress  } = useForm({
    
        file:null,
      })

    

 const submitExcel = (e) =>{
    e.preventDefault();
    Inertia.post('file-import',data,{
        forceFormData: true,

    })
    setData("file", null)
}

  return (
    <Fragment >
       
    <Navbar bg="primary" variant="dark">
           
           <InertiaLink style={{color: "red"}}
               href="/"
               className="btn btn-primary">
               <img src={'./home.png'} />
           </InertiaLink>
           
           <InertiaLink href="/create" className="btn btn-primary">Εισαγωγή Νέου Φοιτητή</InertiaLink>
           <InertiaLink href="/file-import-export" className="btn btn-primary">Εισαγωγή Φοιτητών μέσω Excel</InertiaLink>
           </Navbar>

    <div className="container mt-5 text-center">
    {flash.message && (<div className="alert alert-success alert alert-dismissible">
                    <a className="close" role="button" data-dismiss="alert" aria-label="close">&times;</a>
                    {flash.message}</div>
                )}
    <h2 className="mb-4">
        Εισαγωγή Φοιτητών μέσω Excel αρχείου
    </h2>
    <span className="text-danger">
     <strong>{errors.file}</strong>
  </span>
    <form onSubmit={submitExcel} >

    <Form.Group controlId="formFile" className="mb-3">
       
        <Form.Control   type="file" onChange={(e) => setData("file", e.target.files[0])}/>
      </Form.Group>

 
     

    {progress && (
      <progress value={progress.percentage} max="100">
        {progress.percentage}%
      </progress>
    )}
    <button className='btn btn-primary' type="submit">Submit</button>
    
  </form>

  
</div>
</Fragment>
  )
}

export default Excel;



