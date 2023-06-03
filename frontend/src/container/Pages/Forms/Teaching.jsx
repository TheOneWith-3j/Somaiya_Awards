import React from 'react'
import Navbar from '../../../components/Navbar'
import FormInfo from '../../../components/FormInfo'
import Forms from '../../../components/Forms'
import TeachingForm from '../../../data/TeachingForm'
import TeachingFormStages from '../../../components/utils/data/TeachingFormStages'

const Teaching = () => {

  const title = "Awards Application Form- Teaching"
  const award_info = `The Foundation Day celebration of our organization is when we celebrate, encourage and
  honour our trusted faculty members, proactive staff members and enthusiastic students
  who together strive to make Somaiya Vidyavihar an ideal knowledge eco-system.
  The Human Resources team have been organizing annually the Awards under four
  categories (Faculty, Staff, Students, Research & Institution)
  This form is specific to the award category- Faculty members`

  const message= `Please score the candidate on a scale of 1 – 5 on the below points, with 1 being the
  lowest score and 5 being the highest- Please attach the relevant documents to support your
  nomination.`

  const headings=["Basic Information","Pedagogical Competence","Beyond The Classroom","Professional Development","Supportings"]
  const limit = headings.length -1 
  return (
    <div>

      <Navbar />
      <FormInfo
        title={title}
        info={award_info}
      />
      <Forms
        pageHeadings={headings}
        pageCount={limit}
        data={TeachingForm}
        stages={TeachingFormStages}
        message={message}
       />
    </div>
  )
}

export default Teaching
