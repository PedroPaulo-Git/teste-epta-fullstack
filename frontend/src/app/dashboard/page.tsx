'use client'
import React from 'react'
import SideBarDashboard from '../../components/DashboardComponents/SidebarDashboard'
import HeaderDashboard from '@/components/DashboardComponents/HeaderDashboard'
import ManagerDashboard from '@/components/DashboardComponents/ManagerDashboard'
import { useAuthGuard } from '@/services/useAuthGuard'
import { Loader2 } from 'lucide-react'

export default function Dashboard (){
    //protecao de rota
  const { loading } = useAuthGuard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }
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
