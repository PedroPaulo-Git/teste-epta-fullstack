'use client'
import React from 'react'
import SideBarDashboard from '../../components/DashboardComponents/SidebarDashboard'
import ManagerDashboard from '@/components/DashboardComponents/ManagerDashboard'
import ProtectedRoute from '@/components/Auth/ProtectedRoute'

export default function Dashboard (){
  return (
    <ProtectedRoute>
      <>
        <section className='flex'>
          <SideBarDashboard/>
          <ManagerDashboard/>
        </section>  
      </>
    </ProtectedRoute>
  )
}
