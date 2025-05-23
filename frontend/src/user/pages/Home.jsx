import React from 'react'
import Header from '../components/Header'
import TypeMenu from '../components/ServiceMenu'
import TopCaregivers from '../components/TopCaregivers'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <TypeMenu />
      <TopCaregivers />
      <Banner />
    </div>
  )
}

export default Home
