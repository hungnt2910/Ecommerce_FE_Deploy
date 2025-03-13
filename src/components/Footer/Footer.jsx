import React from 'react'
import { ServiceBanner } from './ServiceBanner'
import { Newsletter } from './Newsletter'
import { EcommerceInfo } from './EcommerceInfo'

export const Footer = () => {
  return (
    <>
        <ServiceBanner/>
        <Newsletter/>
        <EcommerceInfo/>
    </>
  )
}
