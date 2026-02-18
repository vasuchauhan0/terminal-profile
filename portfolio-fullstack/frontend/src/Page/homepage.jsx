import React from 'react'
import Left_Homepage from '../Components/Left_Homepage'
import Right_Homepage from '../Components/Right_Homepage'

const Homepage = () => {
  return (
    <section className="w-full px-10 py-16">


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <Left_Homepage/>
        <Right_Homepage/>
      </div>
    </section>
  )
}

export default Homepage