import React from 'react'
import payloadLogo from '@/assets/images/logo.png'
import Image from 'next/image'

const PayloadLogo = () => {
  return <Image src={payloadLogo.src} alt="Dripta Senapati" width={130} height={130} />
}

export default PayloadLogo
