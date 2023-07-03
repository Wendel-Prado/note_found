'use client'
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { Box } from '@chakra-ui/react'
import SlideShow from '../components/SliderShow'
export default function Home() {
const [art, setArt] = React.useState();
const [mus, setMus] = React.useState();
const [lyrics, setLyrics] = React.useState();
 async function resquestMusic(){
  const key = '05f59b4739df434b6fa440100dd6c7b8'
  await axios.get(`https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${key}`)
  .then((res)=>{

    if(res.data.type == "exact" || res.data.type=="aprox"){
      const {text} = res.data.mus[0]
      setLyrics(text)
      SlideShow(text)
    }
  })
 }

  return (
    <div>
      <h1>NOTe Found</h1>
      <TextField onChange={(e)=>setArt(e.target.value)}></TextField>
      <TextField onChange={(e)=>setMus(e.target.value)}></TextField>
    <Button onClick={resquestMusic}>Gerar Musica</Button>
    <Box>{lyrics}</Box>
    </div>
  )
}
