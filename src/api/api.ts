import { Time } from '@/types/time'
import { Jogador } from '@/types/jogador'
import axios, { AxiosResponse } from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// Função para buscar todos os times
export const getTimes = async (): Promise<Time[]> => {
    try {
        const response: AxiosResponse<Time[]> = await api.get('/times')
        return response.data || []
    } catch (error) {
        console.error('Erro ao buscar times:', error)
        throw new Error('Falha ao buscar times')
    }
}

// Função para buscar todos os jogadores
export const getJogadores = async (): Promise<Jogador[]> => {
    try {
        const response: AxiosResponse<Jogador[]> = await api.get('/jogadores')
        return response.data || []
    } catch (error) {
        console.error('Erro ao buscar jogadores:', error)
        throw new Error('Falha ao buscar jogadores')
    }
}
