import React, { useState } from 'react';
import FormStages from './FormStages';
import Field, { validator } from './utils/Field';
import axios from 'axios'
import { useNavigate, createSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const Forms = (props) => {

  /**
   * Variables and States
   */

  const limit = props.pageCount;
  const pageHeaders = props.pageHeadings;
  const navigate = useNavigate()

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});


  /**
   * functions
   */

  const handleNext = () => {
    if (current < limit) {
      setCurrent(current + 1);

    }

    // color change logic

    const stagesList = (document.querySelectorAll('.stages'));

    for (const stages of stagesList) {

      let stageNumber = Number(stages.innerHTML)

      if (stageNumber < current + 2) {

        stages.classList.add('bg-red-500')
        stages.classList.remove('bg-white')
        stages.classList.add('text-white')
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }

    // color change logic
    const stagesList = (document.querySelectorAll('.stages'));

    for (const stages of stagesList) {

      let stageNumber = Number(stages.innerHTML)

      if (stageNumber > current - 1) {
        stages.classList.remove('bg-red-500')
        stages.classList.remove('text-white')
        stages.classList.add('bg-white')
      }
    }

  };

  const handleFieldChange = (event) => {
    if (event.target.type === 'file') {

      const { name } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.files[0],

      }));
    }
    else {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

  };

  const submit_checker = () => {

  }

  const handleSubmit = () => {

    if (props.data.length !== Object.keys(formData).length) {
      
      Swal.fire({
        title:"Incomplete Form",
        text:"Please fill out the form completely",
        icon:"warning",
        backdrop:true,
        background: 'rgba(255,250,250)',
        iconColor:'rgb(185,28,28)',
        confirmButtonColor:'rgb(185,28,28)',
        buttonsStyling: false,
        customClass:{
          confirmButton:'gradient-button'
        }
      })
    }

    else {

      document.getElementById('submit-btn').disabled = false;
      alert("Form submitted")
      // setFormData({})

      console.log(formData);

      // axios post 
      
    //   const postUrl = `http://localhost:5001/forms/${window.location.href.split('/forms/')[1]}`

    //   axios.post(postUrl, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
          
    //       navigate({
    //         pathname: '/forms/cards',
    //         search: createSearchParams({
    //           submitted: true,
    //           title: "Form submitted Successfully"
    //         }).toString()

    //       })
    //     })
    //     .catch((err) => {

    //       navigate({
    //         pathname:'/forms/cards',
    //         search: createSearchParams({
    //             submitted: false,
    //             title: "Form submitted Successfully"
    //         }).toString()
    //     })

    //       console.log(err);
    //     })

    }


  }


  const handleFormStageChange = (e) => {

    const value = Number(e.target.innerHTML) - 1;
    setCurrent(value)

    // color change logic

    const stagesList = (document.querySelectorAll('.stages'));

    for (const stages of stagesList) {

      let stageNumber = Number(stages.innerHTML)

      if (stageNumber < value + 1) {
        stages.classList.add('bg-red-500');
        stages.classList.add('text-white');
        stages.classList.remove('bg-white');
      }
      else {
        stages.classList.remove('bg-red-500')
        stages.classList.remove('text-white')
        stages.classList.add('bg-white')
      }
    }


  }

  /**
   * Renderers
   */

  const renderFields = () => {
    return props.data.map((entry, index) => {
      if (current === entry.page - 1) {
        return (
          <Field
            type={entry.type}
            title={entry.title}
            name={entry._name}
            required={entry.requiredStatus}
            validate={entry.hasValidations}
            validateType={entry.validationType}
            options={entry.options}
            value={formData[entry._name] || ''}
            fieldsPerLine={entry.fieldsPerLine}
            link={entry.link}
            onChange={handleFieldChange}
            key={index}
          />
        );
      }
      return null;
    });
  };


  /**
   * Return Block
   */


  return (
    <div className="">
      <FormStages stages={props.stages} onClick={handleFormStageChange} />

      <div className="border-black border-[1] mx-auto rounded-xl shadow-2xl bg-0xFAF9F6 p-3 px-[5rem] w-[70%]">

        <div className='w-full text-black text-center py-5  font-Roboto font-semibold text-2xl'>
          {pageHeaders[current]}
        </div>

        {
          props.message === undefined
            ?
            null
            :
            <div className="text-sm font-Poppins mt-[3rem] bg-red-300  font-bold italic rounded-lg p-3 my-5">
              {props.message}
            </div>
        }
        <div className="text-center  mb-[3rem] text-sm italic">
          Page {current + 1} of {limit + 1}
        </div>

        <div className="form py-5 px-3">
          {renderFields()}

          <div className="mt-10 px-3 flex justify-between">
            <button
              onClick={handlePrevious}
              className="shadow-md w-28 bg-red-700 text-white text-lg p-3 rounded-xl"
            >
              Previous
            </button>
            {
              current === limit
                ?
                <button
                  onClick={handleSubmit}
                  id="submit-btn"
                  className="shadow-md w-28 bg-red-700 text-white text-lg p-3 rounded-xl"
                >
                  Submit
                </button>
                :
                <button
                  onClick={handleNext}
                  className="shadow-md w-28 border-red-700  bg-white border-2 hover:bg-red-700 hover:text-white text-lg p-3 rounded-xl"
                >
                  Next
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
