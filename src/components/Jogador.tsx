"use client"

import { Time } from "@/types/time"
import { Jogador as JogadorType } from "@/types/jogador"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getJogadores } from "@/api/api"

type Props = {
    currentTeam: Time
    selectedSetor: string
}

export const Jogador = ({ currentTeam, selectedSetor }: Props) => {
    const [jogadoresFiltrados, setJogadoresFiltrados] = useState<JogadorType[]>([])

    useEffect(() => {
        const fetchJogadores = () => {
            try {
                if (!currentTeam || !selectedSetor) {
                    console.warn("Time ou setor não definidos corretamente.");
                    return;
                }

                // Garantir que jogadores existam antes de filtrar
                const jogadoresDoTime =
                    currentTeam.jogadores?.filter((jogador) => {
                        return (
                            jogador.setor.toUpperCase() === selectedSetor.toUpperCase()
                        );
                    }) || []; // Retorna uma lista vazia se jogadores for undefined

                console.log("Jogadores filtrados:", jogadoresDoTime);
                setJogadoresFiltrados(jogadoresDoTime);
            } catch (error) {
                console.error("Erro ao filtrar jogadores:", error);
            }
        };

        fetchJogadores();
    }, [currentTeam, selectedSetor]);

    const calcularExperiencia = (anoInicio: number) => {
        const anoAtual = new Date().getFullYear()
        return anoAtual - anoInicio
    }

    if (jogadoresFiltrados.length === 0) {
        return (
            <div className="w-full flex flex-col gap-3 p-4 z-50">
                <p>Nenhum jogador encontrado para o time e setor selecionados.</p>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-3 p-4 z-50">
            {jogadoresFiltrados.map((jogador: JogadorType) => {
                const camisaPath = `/assets/times/camisas/${currentTeam.nome}/${jogador.camisa}`
                const experienciaAnos = calcularExperiencia(jogador.experiencia)

                return (
                    <Link
                        href={`/${currentTeam.nome}/${jogador.id}`}
                        key={jogador.id}
                        className="flex h-24 justify-between items-center p-4 rounded-md border text-sm 
                            md:text-base xl:text-lg xl:max-w-[1200px] xl:min-w-[1100px] xl:m-auto transition duration-300"
                        style={{
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = `${currentTeam.cor}50`)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#FFF")
                        }
                    >
                        <div className="flex-1">
                            <Image src={camisaPath} width={60} height={60} alt="Camisa" quality={100} className="w-auto h-auto" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="text-xl font-extrabold italic">{jogador.nome}</div>
                                <div className="text-xl font-extrabold">({jogador.posicao})</div>
                            </div>
                            <div className="flex justify-between gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="text-xs">IDADE</div>
                                    <div className="text-base font-bold">{jogador.idade}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-xs">ALTURA</div>
                                    <div className="text-base font-bold">{jogador.altura.toFixed(2)}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-xs">PESO</div>
                                    <div className="text-base font-bold">{jogador.peso}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-xs">EXPERIÊNCIA</div>
                                    <div className="text-base font-bold">
                                        {experienciaAnos} ANO{experienciaAnos > 1 ? "S" : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}
