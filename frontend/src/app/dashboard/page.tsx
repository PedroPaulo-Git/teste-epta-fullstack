import React from 'react'
import SideBarDashboard from '../../components/DashboardComponents/SidebarDashboard'
import HeaderDashboard from '@/components/DashboardComponents/HeaderDashboard'
import VehicleTableDashboard from '@/components/DashboardComponents/VehicleTableDashboard'
import ManagerDashboard from '@/components/DashboardComponents/ManagerDashboard'

export default function Dashboard (){
  return (
    <>
    <HeaderDashboard/>
    <section className='flex'>
    <SideBarDashboard/>
    <ManagerDashboard/>
    {/* <VehicleTableDashboard/> */}
    </section>  
    </>
  )
}
