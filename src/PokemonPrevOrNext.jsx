import axios from "axios";
import { useEffect } from "react";
import { firstLetterToUpperCaseFormatFunc } from "./firstLetterToUpperCaseFormatFunc";

const PokemonPrevOrNext = ({pkData, setPkData, pkDataPrev, setPkDataPrev, pkDataNext, setPkDataNext}) => {

    const handlePrevClick = () => {
        setPkData({...pkDataPrev})
    }

    const handleNextClick = () => {
        setPkData({...pkDataNext})
    }

    const fetchPrevPokemon = async() => {
        let prevPokemonId = pkData.id - 1;
        if(prevPokemonId === 0){prevPokemonId = 905;}
        
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${prevPokemonId}`)
        .then((res) => res.data)
        .catch((err) => alert(err));
        return result;
    }

    const fetchNextPokemon = async() => {
        let nextPokemonId = pkData.id + 1;
        if(nextPokemonId === 906){nextPokemonId = 1}

        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextPokemonId}`)
        .then((res) => res.data)
        .catch((err) => alert(err));
        return result;
    }

    useEffect(() => {(async() => {
        setPkDataPrev(await fetchPrevPokemon());
        setPkDataNext(await fetchNextPokemon());
    })()},[pkData])

    return (
        <div className="pokemon-switch">
            <button onClick={() => {handlePrevClick()}}>{`< ${pkDataPrev.name} N° ${pkDataPrev.id}`}</button>
            <button onClick={() => {handleNextClick()}}>{`${pkDataNext.name} N° ${pkDataNext.id} >`}</button>
        </div>
    )
}       

export default PokemonPrevOrNext;