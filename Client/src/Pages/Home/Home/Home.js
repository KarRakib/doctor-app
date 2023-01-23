import React from 'react'
import Care from '../../Care/Care'
import OfficeTime from '../../OfiiceTime/OfficeTime'
import Services from '../../Services/Services'
import Appointment from '../Appointment/Appointment'
import Banner from '../Banner/Banner'
import Testimonial from '../Testimonial/Testimonial'

function Home() {
  return (
  <div>
  <Banner></Banner>
  <OfficeTime></OfficeTime>
  <Services></Services>
  <Care></Care>
  <Appointment></Appointment>
  <Testimonial></Testimonial>
  </div>
  )
}

export default Home