import React from 'react'
import './HeroSection.css'
import logo from '../../assets/logo/logo.png'

const HeroSection = () => {
  return (
    <section className="hero">
      <img className="hero__logo" src={logo} alt="Pasifika Hub logo" />
      <h2 className="hero__tagline">Your gateway to paradise</h2>
    </section>
  )
}

export default HeroSection