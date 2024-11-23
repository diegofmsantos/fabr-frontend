"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { ButtonTime } from "@/components/ui/buttonTime"
import { ButtonSetor } from "@/components/ui/buttonSetor"
import { Jogador } from "@/components/Jogador"
import { CurrentTime } from "@/components/Time"
import { motion } from "framer-motion"
import { Time } from "@/types/time"
import { Times } from "@/data/times"

type Setor = "ATAQUE" | "DEFESA" | "SPECIAL"

export default function Page() {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const timeName = Array.isArray(params.time) ? params.time[0] : params.time

    const [currentTeam, setCurrentTeam] = useState<Time | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedButton, setSelectedButton] = useState(searchParams.get("show") || "time")
    const [selectedSetor, setSelectedSetor] = useState<Setor>((searchParams.get("setor") as Setor) || "ATAQUE")

    useEffect(() => {
        const fetchCurrentTeam = () => {
            try {
                // Busca o time diretamente no array de times
                const team = Times.find(
                    (t) =>
                        t.nome?.toLowerCase() ===
                        decodeURIComponent(timeName).toLowerCase()
                );
                setCurrentTeam(team || null);
            } catch (error) {
                console.error("Erro ao buscar os times:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentTeam();
    }, [timeName]);
    useEffect(() => {
        setSelectedButton(searchParams.get("show") || "time")
        setSelectedSetor((searchParams.get("setor") as Setor) || "ATAQUE")
    }, [searchParams])

    const handleShowTime = () => {
        router.replace(`?show=time`)
        setSelectedButton("time")
    }

    const handleShowJogadores = () => {
        router.replace(`?show=jogadores&setor=${encodeURIComponent(selectedSetor)}`)
        setSelectedButton("jogadores")
    }

    const handleSetorChange = (setor: Setor) => {
        setSelectedSetor(setor)
        router.replace(`?show=jogadores&setor=${encodeURIComponent(setor)}`)
    }

    if (loading) {
        return <div>Carregando dados do time...</div>
    }

    if (!currentTeam) {
        return <div>Time não encontrado</div>
    }

    const capacetePath = `/assets/times/capacetes/${currentTeam.capacete}`

    return (
        <div>
            <div className="w-full fixed z-50">
                <div
                    className="p-4 w-full h-[410px] flex flex-col justify-center items-center rounded-b-xl"
                    style={{ backgroundColor: currentTeam.cor || "#000" }}
                >
                    <Link
                        href={"/"}
                        className="absolute top-10 left-5 rounded-xl text-xs text-white py-1 px-2 bg-black/20"
                    >
                        {currentTeam.sigla || "N/A"}
                        <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
                    </Link>
                    <div className="flex flex-col justify-center items-center mt-10">
                        <div className="text-[48px] text-white text-center px-4 font-extrabold italic leading-[35px] tracking-[-3px]">
                            {currentTeam.nome?.toLocaleUpperCase() || "Time Indefinido"}
                        </div>
                        {currentTeam.capacete && (
                            <div className="w-48 h-48 rotate-[15deg]">
                                <Image
                                    src={capacetePath}
                                    alt={`${currentTeam.nome || "Time"} capacete`}
                                    width={180}
                                    height={180}
                                    quality={100}
                                    priority
                                    className="w-auto h-auto"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between gap-8 -mt-3">
                        <ButtonTime
                            label="TIME"
                            onClick={handleShowTime}
                            isSelected={selectedButton === "time"}
                        />
                        <ButtonTime
                            label="JOGADORES"
                            onClick={handleShowJogadores}
                            isSelected={selectedButton === "jogadores"}
                        />
                    </div>
                </div>
            </div>

            {selectedButton === "jogadores" && (
                <motion.div
                    className="w-full pt-[410px] xl:max-w-[1200px] xl:min-w-[1100px] xl:m-auto xl:mb-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="fixed w-full xl:max-w-[1200px] xl:min-w-[1100px] xl:m-auto">
                        <section className="w-full flex items-center justify-between gap-5 py-5 px-4 bg-white md:px-6">
                            <ButtonSetor
                                label="ATAQUE"
                                borderColor={currentTeam.cor || "#000"}
                                isSelected={selectedSetor === "ATAQUE"}
                                onClick={() => handleSetorChange("ATAQUE")}
                            />
                            <ButtonSetor
                                label="DEFESA"
                                borderColor={currentTeam.cor || "#000"}
                                isSelected={selectedSetor === "DEFESA"}
                                onClick={() => handleSetorChange("DEFESA")}
                            />
                            <ButtonSetor
                                label="SPECIAL"
                                borderColor={currentTeam.cor || "#000"}
                                isSelected={selectedSetor === "SPECIAL"}
                                onClick={() => handleSetorChange("SPECIAL")}
                            />
                        </section>
                    </div>
                    <div className="mt-[60px] xl:mt-[123px] xl:border">
                        <Jogador currentTeam={currentTeam} selectedSetor={selectedSetor} />
                    </div>
                </motion.div>
            )}

            {selectedButton === "time" && (
                <motion.div
                    className="pt-[410px]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <CurrentTime currentTeam={currentTeam} />
                </motion.div>
            )}
        </div>
    )
}
