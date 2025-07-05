'use client'
import React, { useEffect, useState } from 'react'
import SideBarDashboard from '../../components/DashboardComponents/SidebarDashboard'
import HeaderManager from '../../components/DashboardComponents/shared/HeaderManager'
import ProtectedRoute from '@/components/Auth/ProtectedRoute'
import api from '@/services/api'
import { Vehicle } from '@/types'

export default function Relatorio() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);    
  const [loading, setLoading] = useState(true);
  const ativos = vehicles.filter((v) => v.status === "active").length;
  const inativos = vehicles.filter((v) => v.status === "inactive").length;
  const total = vehicles.length;

  // Pega a lista de veículos no backend
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <ProtectedRoute>
      <>
        <section className='flex'>
          <SideBarDashboard/>
          <section className="w-full p-8">
            <HeaderManager
              ativos={ativos}
              inativos={inativos}
              total={total}
            />
            
            {/* Conteúdo de Relatórios */}
            <div className="mt-8">
              <h2 className="text-neutralDashboard-100 text-2xl md:text-3xl md:font-normal mb-6">
                Relatórios e Estatísticas
              </h2>
              
              {/* Cards de Estatísticas Detalhadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-graySecondary-600 font-normal">Taxa de Atividade</p>
                      <p className="text-darkgraySecondary-900 text-2xl font-bold">
                        {total > 0 ? Math.round((ativos / total) * 100) : 0}%
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-graySecondary-600 font-normal">Veículos por Status</p>
                      <p className="text-darkgraySecondary-900 text-2xl font-bold">
                        {ativos} / {inativos}
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-graySecondary-600 font-normal">Eficiência Geral</p>
                      <p className="text-darkgraySecondary-900 text-2xl font-bold">
                        {total > 0 ? Math.round((ativos / total) * 100) : 0}%
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de Distribuição */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold text-neutralDashboard-100 mb-4">Distribuição de Veículos</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-graySecondary-600 mb-2">
                      <span>Veículos Ativos</span>
                      <span>{total > 0 ? Math.round((ativos / total) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-graySecondary-300 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${total > 0 ? (ativos / total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-graySecondary-600 mb-2">
                      <span>Veículos Inativos</span>
                      <span>{total > 0 ? Math.round((inativos / total) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-graySecondary-300 rounded-full h-3">
                      <div 
                        className="bg-yellow-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${total > 0 ? (inativos / total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo Executivo */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-neutralDashboard-100 mb-4">Resumo Executivo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-neutralDashboard-100 mb-3">Análise de Performance</h4>
                    <ul className="space-y-2 text-sm text-graySecondary-600">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {ativos} veículos operacionais
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        {inativos} veículos em manutenção
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Taxa de disponibilidade: {total > 0 ? Math.round((ativos / total) * 100) : 0}%
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutralDashboard-100 mb-3">Recomendações</h4>
                    <ul className="space-y-2 text-sm text-graySecondary-600">
                      <li>• Manter controle regular dos veículos ativos</li>
                      <li>• Revisar veículos inativos para reativação</li>
                      <li>• Monitorar indicadores de performance mensalmente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>  
      </>
    </ProtectedRoute>
  )
} 